resource "aws_ecs_cluster" "main" {
  name = "${var.system_name_with_environment}-cluster"
  tags = {
    Name = "${var.system_name_with_environment}-cluster"
  }
}

#####
# OUTPUTS
#####
output "cluster_id" {
  value = aws_ecs_cluster.main.id
}

output "cluster_name" {
  value = aws_ecs_cluster.main.name
}