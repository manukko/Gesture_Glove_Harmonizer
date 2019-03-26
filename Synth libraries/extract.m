function [vector,amps]= extract(y) 

    freq = zeros(1,length(y));
    amp = zeros(1,length(y));
    j = 1;
    i = 1;
    
    while i < length(y)
        if (y(i) > 0)
            freq(j) = i;
            amp(j) = y(i);
            j = j+1;
        end
        i = i+1;
    end
    
    freq = freq(1:end-(i-j));
    amp = amp(1:end-(i-j));
    
    vector = freq;
    amps = amp;
end

        
    
   
