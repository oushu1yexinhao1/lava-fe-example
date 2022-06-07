#!/bin/sh
set -e
RPM_NAME="cloud-ui-example"
##################################################prepare rpm env
mkdir -p ~/rpmbuild/{BUILD,RPMS,SOURCES,SPECS,SRPMS}
mkdir -p ~/rpmbuild/BUILD/bin
DEPENDENCYPATH="/root/node/dependency"
LIBS=("lava-fe-lib")
version_lt() { test "$(echo "$@" | tr " " "\n" | sort -rV | head -n 1)" != "$1"; }
##################################################compile
for MODULE_NAME in "lava-fe-example"
do
  PROJECT_PATH="/root/node/src/${MODULE_NAME}"
  # ASSETS_PATH="${PROJECT_PATH}/assets"
  # REPO_PATH="${PROJECT_PATH}/src/${MODULE_NAME}"
  ##################################################prepare compile
  ## 编译时依赖: node_modules_client node_modules_server
  tar -xzf ${DEPENDENCYPATH}/${MODULE_NAME}/node_modules_client.tar.gz -C ${PROJECT_PATH}
  tar -xzf ${DEPENDENCYPATH}/server/node_modules_server.tar.gz -C ${PROJECT_PATH}/server
  ##################################################compile package
  cd ${PROJECT_PATH}
  ################################################# 判断指定的lib版本，如果不是最新则更新
  for LIB_NAME in "${LIBS[@]}"
  do
    CUR_VERSION=$(npm list "${LIB_NAME}" | grep "${LIB_NAME}" | sed 's/[^0-9.]*\([0-9.]*\).*/\1/')
    REMOTE_LATEST_VERSION=$(npm view "${LIB_NAME}" version)
    if version_lt "$CUR_VERSION" "$REMOTE_LATEST_VERSION"; then
      echo "${LIB_NAME} 需要更新"
      npm install --save "${LIB_NAME}@latest"
      tar -czf node_modules_client.tar.gz node_modules
      mv -f node_modules_client.tar.gz ${DEPENDENCYPATH}/${MODULE_NAME}
    fi
  done
  #################################################编译项目
  {
    npm run build
  } || {
    echo "编译失败，尝试重新拉取依赖包"
    npm install
    npm run build
    tar -czf node_modules_client.tar.gz node_modules
    mv -f node_modules_client.tar.gz ${DEPENDENCYPATH}/${MODULE_NAME}
  }
  ##################################################copy to rpm folder
  cd ~
  cp -rf ${PROJECT_PATH}/dist ${PROJECT_PATH}/server
  cp -rf ${PROJECT_PATH}/server ~/rpmbuild/BUILD/${MODULE_NAME}
done
#####################################################build rpm
cd ~
SPEC_PATH=/root/node/src/lava-fe-example/docker/${RPM_NAME}.spec
cp ${SPEC_PATH} ~/rpmbuild/SPECS
sed -i "s/VERSION/${VERSION}/g" ~/rpmbuild/SPECS/${RPM_NAME}.spec
sed -i "s/BUILD_NUMBER/${BUILD_NUMBER}/g" ~/rpmbuild/SPECS/${RPM_NAME}.spec
rpmbuild -bb ~/rpmbuild/SPECS/${RPM_NAME}.spec
cp ~/rpmbuild/RPMS/x86_64/* /root/node/target/
rm -rf ~/rpmbuild

echo "Finish ${RPM_NAME}"
