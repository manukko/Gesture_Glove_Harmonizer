clear all
clc

x = 0:.1:1;
A = [x; exp(x)];

fileID = fopen('doc.txt','w');

fprintf(fileID,'%6.2f ',A);
fclose(fileID);