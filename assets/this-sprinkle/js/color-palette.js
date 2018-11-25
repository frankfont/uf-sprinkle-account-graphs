/**
 * Helper for generating chart colors
 * Open Source Released as MIT License
 * @author Frank Font <room4me.com>
 */

function mycolors()
{
    var cp = null;
    
    var getOneColorFromPalette = function(offset, alpha)
    {
        var cp = getColorPalette(offset + 1, alpha);
        var onecolor = cp[offset];
        return onecolor;
    };
    
    var getColorPalette = function(size, alpha)
    {
        if ( cp !== null )
        {
            return cp;
        } else {
            var mycolors = [
                [255,99,132],
                [54,162,235],
                [255,206,86],
                [75,192,192],
                [153,102,255],
                [255,159,64]
            ];
            var praw=[];
            for (var i = 0; i < size; i++) 
            {
                var m = i % mycolors.length;
                var r = mycolors[m][0];
                var g = mycolors[m][1];
                var b = mycolors[m][2];
                if(m < i)
                {
                    //Come up with a new color
                    var f = 1.2 * ((m % 3) - 1);
                    if(f===0)
                    {
                        f=1;
                    }
                    var offset=i-m-1;
                    var r2 = Math.floor(Math.min(255, Math.abs(f * (r + praw[offset][0]) / 2)));
                    var g2 = Math.floor(Math.min(255, Math.abs(f * (g + praw[offset][1]) / 2)));
                    var b2 = Math.floor(Math.min(255, Math.abs(f * (b + praw[offset][2]) / 2)));
                    r=r2;
                    g=g2;
                    b=b2;
                }
                praw.push([r,g,b]);
            }

            return praw.map(function(item){return 'rgba('+item[0]+','+item[1]+','+item[2]+',' + alpha + ')'});
        }
    };

    
    return {getOneColorFromPalette: getOneColorFromPalette, getColorPalette: getColorPalette};
};

