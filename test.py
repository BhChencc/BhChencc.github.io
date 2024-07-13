from github import Github
import os

# 认证
g = Github("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")

# 获取仓库
repo = g.get_repo("BhChencc/Zoma")

# 指定要上传的本地文件路径
file_path = "/Users/baihuichen/Desktop/img/1.png"

# 读取文件内容
with open(file_path, "rb") as file:
    content = file.read()

# 获取文件名
file_name = os.path.basename(file_path)

# 上传文件
repo.create_file(file_name, "Commit message", content)

print(f"File {file_name} has been uploaded to GitHub.")