function timbre = create(y)

fs = 44100;
dur = 2
t = [0:(1/fs):dur]; 
note = 0;


for i = 1:length(y)
    if (y(i) ~= 0)
        note = note + sin(2*pi*i*t)*(y(i));
    end
end

timbre = note;

fftSignal = fft(timbre);
fftSignal = fftshift(fftSignal);
f = fs/2*linspace(-1,1,length(fftSignal));

figure;
plot(f, abs(fftSignal));


end