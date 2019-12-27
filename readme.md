## Vue常用预设

该仓库为个人用vue-cli构建预设，参考 <a href="https://cli.vuejs.org/zh/guide/plugins-and-presets.html#%E8%BF%9C%E7%A8%8B%E9%A2%84%E8%AE%BE">vue-cli 远程预设文档实现</a>。

## 使用方法
1. 本地使用
```sh
    # clone本仓库到本地
    # REPO_PATH应当是一个包含 preset.json 的文件夹
    vue create --preset REPO_PATH my-project
```

2. 远程调用
```sh
    vue create --preset sexyHuang/my-vue-preset my-project
```