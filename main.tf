provider "aws" {
  region = "us-east-1"
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "my-vpc"
  }
}

#In different AZ because RDS needs at least 2 subnets in different AZs
# Public Subnet in AZ 1
resource "aws_subnet" "public_az1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet-az1"
  }
}

# Public Subnet in AZ 2
resource "aws_subnet" "public_az2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet-az2"
  }
}

# Private Subnet in AZ 1
resource "aws_subnet" "private_az1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "private-subnet-az1"
  }
}

# Private Subnet in AZ 2
resource "aws_subnet" "private_az2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "us-east-1b"

  tags = {
    Name = "private-subnet-az2"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "internet-gateway"
  }
}

# NAT Gateway
resource "aws_eip" "nat" {
  domain = "vpc"
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public_az1.id

  tags = {
    Name = "nat-gateway"
  }
}

# Public Route Table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  tags = {
    Name = "public-route-table"
  }
}

# Associate Public Route Table with Subnet
resource "aws_route_table_association" "public_az1" {
  subnet_id      = aws_subnet.public_az1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_az2" {
  subnet_id      = aws_subnet.public_az2.id
  route_table_id = aws_route_table.public.id
}

# Private Route Table
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }

  tags = {
    Name = "private-route-table"
  }
}

# Associate Private Route Table with Subnet
resource "aws_route_table_association" "private_az1" {
  subnet_id      = aws_subnet.private_az1.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_az2" {
  subnet_id      = aws_subnet.private_az2.id
  route_table_id = aws_route_table.private.id
}

# Security Group for EC2
resource "aws_security_group" "ec2_sg" {
  name_prefix = "ec2-sg"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow SSH from anywhere
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow HTTP traffic for backend
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ec2-security-group"
  }
}

# EC2 Instance
resource "aws_instance" "backend" {
  ami           = "ami-0e2c8caa4b6378d8c" # Ubuntu Server 24.04 LTS (HVM), SSD Volume Type
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public_az1.id    # Use the public subnet for easier initial access
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
  key_name  = "ssh_key"

  tags = {
    Name = "backend-instance"
  }
}

# Elastic IP for EC2
resource "aws_eip" "backend_eip" {
  instance = aws_instance.backend.id

  tags = {
    Name = "backend-elastic-ip"
  }
}

# S3 Bucket
resource "aws_s3_bucket" "my_bucket" {
  bucket = "my-backend-storage-bucket-1234"

  tags = {
    Name = "my-backend-storage-bucket"
  }
}

# S3 Bucket Policy to Restrict Access to VPC
resource "aws_s3_bucket_policy" "my_bucket_policy" {
  bucket = aws_s3_bucket.my_bucket.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "AllowAccessFromVPC",
        Effect    = "Allow",
        Principal = "*",
        Action    = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:ListBucket"
        ],
        Resource = [
          aws_s3_bucket.my_bucket.arn,
          "${aws_s3_bucket.my_bucket.arn}/*"
        ],
        Condition = {
          StringEquals = {
            "aws:SourceVpc" = aws_vpc.main.id
          }
        }
      }
    ]
  })
}








