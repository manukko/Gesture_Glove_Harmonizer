close all;
clear all;

scelta = 10;

%ora dobbiamo cercare un modo per eliminare ancora di più i problemi con il
%beating 

%fai un check anche sul funziona latest

if(scelta == 11) [audio,fs] = audioread('FluteC.mp3'); soil = 2; step = 2; % o anche 7
end
if(scelta == 12) [audio,fs] = audioread('TrumpetC.mp3'); soil = 4; step = 22; % o anche 7
end



if(scelta == 20) [audio,fs] = audioread('ViolinC.mp3'); soil = 5; step = 20; % o anche 7
end
if(scelta == 30) [audio,fs] = audioread('TriangC.mp3'); soil = 4; step = 22; % o anche 7
end
if(scelta == 40) [audio,fs] = audioread('Synth1C.mp3'); soil = 6; step = 10; % o anche 7
end
if(scelta == 50) [audio,fs] = audioread('Synth2C.mp3'); soil = 0; step = 1; % o anche 7
end
if(scelta == 60) [audio,fs] = audioread('PianoC.mp3'); soil = 6; step = 10; % o anche 7
end
if(scelta == 70) [audio,fs] = audioread('ElPianoC.mp3'); soil = 5; step = 5; % o anche 7
end




if(scelta == 200) [audio,fs] = audioread('manumidC.mp3'); soil = 18; step = 20; % o anche 7
end
if(scelta == 300) [audio,fs] = audioread('manuhiC.mp3'); soil = 60; step = 12; % o anche 7
end
if(scelta == 400) [audio,fs] = audioread('fedemidC.mp3'); soil = 60; step = 12; % o anche 7
end
if(scelta == 500) [audio,fs] = audioread('fedelowC.mp3'); soil = 20; step = 2; % o anche 7
end






if(scelta == 10) [audio,fs] = audioread('saw.mp3'); soil = 100; step = 24; % o anche 7
end


if(scelta == 1) [audio,fs] = audioread('voceb.mp3'); soil = 22; step = 16; %trumpet
else if (scelta == 2) [audio,fs] = audioread('string.mp3'); soil = 3; step = 23; %A440
        else if (scelta == 3) [audio,fs] = audioread('saw.mp3'); soil = 3;step = 18; %nota
                else if (scelta == 4) [audio,fs] = audioread('rhodes.mp3'); soil = 25; step = 8; %organ
                    end
            end
    end
end



cuta = 1; %sec
cutb = 2;
dur = cutb-cuta;

signal = audio(cuta*fs:cutb*fs);


fftSignal = fft(signal);
fftSignal = fftshift(fftSignal);
f = fs/2*linspace(-1,1,length(fftSignal));

figure;
plot(f, abs(fftSignal));
%stem(f, abs(fftSignal));
title('magnitude FFT of sine');
xlabel('Frequency (Hz)');
ylabel('magnitude');


h = findobj(gca,'Type','line')
x=get(h,'Xdata');
y=get(h,'Ydata');

vec = zeros(1,22055);

lengt = floor(length(y)/2);


position = 0;
for i=lengt:length(y)
     if(y(i) > soil)
         if(position ~= floor((i+1-lengt)/dur))
             position = floor((i+1-lengt)/dur);
             vec(position)=y(i);        
         end                 
     end
end

%potrei trovare tutti i valori sotto una certa soglia ed evitare che
%esistano


%CTRL+R to comment CTRL+T to uncomment
% massimo = 0;
% massimai = 0;
% for i=lengt:length(y)
%      if(massimo<y(i)) 
%          massimo = y(i);
%          massimai = floor((i-lengt)/dur);
%      end
% end
% maxAmp = massimo;
% maxFreq = massimai;


%PERFETTOOOOOOOOOO (per evitare beating ecc)


for j=step:step*2:length(vec)-step
    
    
    if(j>25 && j<17000)
        mas = 0;
        for m=j-step:j+step %nell'altro non avevo messo step/2 ma solo step 
            if(mas < vec(m))
                mas = vec(m);
            end
        end
        
        for m=j-step:j+step
            if(mas ~= vec(m))
                vec(m) = 0;
            end
        end
       
    else
        vec(j) = 0;
    end

end



soundsc(signal,fs);

pause(dur);
timbr = create(vec);


soundsc(timbr,fs);


[freqs,amps] = extract(vec); %per ottenere il vettore delle frequenze e delle ampiezze sistemati
[val, idx] = max(amps);
freqs = (freqs./freqs(idx)); %ho i multipli della frequenza fondamentale per creare le sinusoidi

fileID = fopen('doc.txt','w');
fileID2 = fopen('doc2.txt','w');

%freqs = freqs(idx:end);  per partire direttamente dalla fondamentale
%amps = amps(idx:end);

fprintf(fileID,'%6.4f, ',freqs);
fprintf(fileID2, '%6.4f,', amps/10);

