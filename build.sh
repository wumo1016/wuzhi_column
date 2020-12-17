#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入静态文件夹
cd dist

# commit提交所有文件
git init
git add -A
git commit -m 'deploy'

# 推送到github
git push -f https://github.com/wumo1016/wuzhi_column.git master:page

cd -
