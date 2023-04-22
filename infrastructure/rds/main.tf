#####
# SECURITY GROUP
#####
resource "aws_security_group" "rds" {
  name   = "${var.system_name_with_environment}-sg-rds"
  vpc_id = var.vpc_id

  ingress {
    from_port        = 5432
    to_port          = 5432
    protocol         = "tcp"
    #    security_groups = [aws_security_group.ecs_tasks.id]
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    from_port        = 5432
    to_port          = 5432
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

#####
# RDS INSTANCE
#####
resource "aws_db_subnet_group" "main" {
  name       = "${var.system_name_with_environment}-rds-subnet-gr"
  subnet_ids = var.subnets.*.id
}

resource "aws_db_instance" "main" {
  identifier             = "${var.system_name_with_environment}-db"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  engine                 = "postgres"
  engine_version         = "14.4"
  db_name                = "postgres"
  username               = var.username
  password               = var.password
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = true
  skip_final_snapshot    = true
}

#####
# OUTPUTS
#####
output "address" {
  value = aws_db_instance.main.address
}

output "port" {
  value = aws_db_instance.main.port
}

output "name" {
  value = aws_db_instance.main.db_name
}

output "user_name" {
  value = aws_db_instance.main.username
}

output "password" {
  value = aws_db_instance.main.password
}