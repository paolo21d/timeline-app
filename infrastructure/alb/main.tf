#####
# Security Group
#####
resource "aws_security_group" "alb" {
  name   = "${var.system_name_with_environment}-sg-alb"
  vpc_id = var.vpc_id

  ingress {
    protocol         = "tcp"
    from_port        = var.alb_listener_port
    to_port          = var.alb_listener_port
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    protocol         = "tcp"
    from_port        = 443
    to_port          = 443
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    protocol         = "-1"
    from_port        = 0
    to_port          = 0
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "${var.system_name_with_environment}-sg-alb"
  }
}

#####
# Application Load Balancer
#####
resource "aws_lb" "main" {
  name                       = "${var.system_name_with_environment}-alb"
  internal                   = false
  load_balancer_type         = "application"
  security_groups            = [aws_security_group.alb.id]
  subnets                    = var.subnets.*.id
  enable_deletion_protection = false

  tags = {
    Name = "${var.system_name_with_environment}-alb"
  }
}

#####
# ALB listener
#####
resource "aws_alb_listener" "http" {
  load_balancer_arn = aws_lb.main.id
  port              = var.alb_listener_port
  protocol          = "HTTP"

  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = "text/plain"
      message_body = "Go to specific service path"
      status_code  = "404"
    }
  }
}

#####
# OUTPUTS
#####
output "load_balancer_id" {
  value = aws_lb.main.id
}

output "load_balancer_listener_arn" {
  value = aws_alb_listener.http.arn
}

output "load_balancer_dns" {
  value = aws_lb.main.dns_name
}