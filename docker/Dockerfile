FROM centos:centos7.4.1708

#本地调试
# COPY . /root/node/lava-fe-core/src/lava-fe-core/
# COPY ./build_assets/node_modules_client.tar.gz /root/node/lava-fe-core/assets/
# COPY ./build_assets/node_modules_server.tar.gz /root/node/lava-fe-core/assets/

RUN /bin/bash \
    && echo "export ENV=production" >> ~/.bashrc \
    ## 这个地方有可能会网络错误，如果build失败重试即可
    && curl -sL https://rpm.nodesource.com/setup_14.x | bash - \
    && yum install -y nodejs \
    && source ~/.bashrc \
    && yum install -y rpm-build

ENTRYPOINT ["sh", "/root/node/src/entrypoint.sh"]