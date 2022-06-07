%define name            cloud-ui-example
%define version         VERSION
%define build_number    BUILD_NUMBER.el7
%define installdir      /usr/local/oushu/cloud-ui-example-VERSION
%define logdir          /var/log/oushu/cloud-ui-example
%define homedir         /home/oushu
%define installlink     /usr/local/oushu/cloud-ui-example



Name:           %{name}
Summary:        cloud-ui-example powered by Oushu Inc
Version:        %{version}
Release:        %{build_number}
Group:          Applications/
License:        Oushu License
Requires:       nodejs = 2:14.18.2-1nodesource

%description
Oushu Platform Frontend Core (powered by qiankun)

%pre
if [[ -d %{installdir} ]]
then
     echo "install folder already exists and is not a symbol link"
     exit 1
fi

getent group oushu >/dev/null  || groupadd -r oushu
getent passwd oushu >/dev/null || /usr/sbin/useradd --comment "Oushu Product" --shell /bin/bash -m -r -g oushu oushu

%build

%install
mkdir -p ${RPM_BUILD_ROOT}%{installdir}
cp -r %{_builddir}/* ${RPM_BUILD_ROOT}%{installdir}


mkdir -p ${RPM_BUILD_ROOT}%{logdir}
%__install -d -m 0755 $RPM_BUILD_ROOT/%{homedir}

%post
ln -s %{installdir} %{installlink}

%postun
rm -rf %{installlink}
rm -rf %{installdir}

%files
%attr(0755,oushu,oushu) %{installdir}
%attr(0755,oushu,oushu) %{logdir}
