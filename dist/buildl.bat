rem �ر��Զ����
@echo off 
set verno=
set /p verno=������汾��:
rem ����õ���������Ϣ
set version=%verno%

echo ���Ŀ��Ŀ¼
mkdir target
cd target
del /s /q /f *.*
for /d %%i in (*) do rd /s /q "%%i"
mkdir softkey
cd ..
pause

echo �����ļ�
xcopy .\softKey .\target\softkey /E /Y

echo ���Ӱ汾��Ϣ%tcrversion%��.\target\tcr_tmp\version
echo %version% > .\target\softkey\version.ini

echo ����js
call java -jar ./build/jscomp.jar ./target/softkey virtualkeyboard.full.js,JP.js

xcopy .\*_demo*.html .\target
xcopy .\*.js .\target
xcopy .\*.md .\target

echo ������
pause