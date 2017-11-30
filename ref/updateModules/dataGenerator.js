

const del = require('del');
var fs = require('fs');
const cheerio = require('cheerio');
module.exports = class dataGenerator {
    constructor (serverData) {
        this.serverData = serverData
    }
    listToTree (list) {
        var map = {}, node, roots = [], i;
        list.sort((a,b)=>{
            let a_comp = parseInt(a.displayname.split('.')[0],10)
            let b_comp = parseInt(b.displayname.split('.')[0],10)
            return (isNaN(a_comp)?1000:a_comp) - (isNaN(b_comp)?1000:b_comp)
        })
        for (i = 0; i < list.length; i += 1) {
            map[list[i].km_articleid] = i; // initialize the map
            list[i].children = []; // initialize the children
        }
        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            if (node.parent_article > 0) {
                 // if you have dangling branches check that map[node.parentId] exists
                if (map[node.parent_article] !== undefined)
                 list[map[node.parent_article]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots;
    }
    // sortTree (treeList) {
    //     if (!treeList.length)
    //         return treeList
    //     treeList.
    // }
    generateTreeMenuFromFile() {
        var list = this.serverData.map((elem)=>{
            return {
                km_articleid:elem.fieldList.km_articleid,
                displayname:elem.fieldList.displayname,
                parent_article: elem.fieldList.parent_article
                
            }
        })
        del(['tree.json']).then(paths => {
            fs.writeFile('./tree.json', JSON.stringify(this.listToTree(list)),{ flag: 'wx' }, function(err) {
                if(err) {
                    return console.log(err);
                }
            
                console.log("Tree menu was saved to ./tree.json");
            }); 
        })
        
    }
    generateArticlesFromFile() {
        del(['data/*.html']).then(paths => {
            var count = 0
            this.serverData.forEach(function(article) {
                var filepath = "./data/article_" + article.fieldList.km_articleid + ".html"
                var htmlContent
                htmlContent = article.fieldList.description || `
                <div style="width:100%; text-align:center">
                <img alt="1359477091749.jpg" 
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gODUK/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/9sAQwEFBQUHBgcOCAgOHhQRFB4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4e/8AAEQgBrgJcAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+y6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooo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
                Yj0Ow0j9n3Rby1hjW41N5rm6cKAzv5jIuT3wqgCvcq534feFdN8E+
                DtN8K6N5xsdOi8qIzMGkb5ixZiAASSxPQV0VABRRRQAUGiigD8/8A9tP4ZXXgD4iwfEHw6slvpurXX2jfEMfZL4HecegcjevuHHYV9f8AwF+Ill8Tfhrp3iSAxi7C+RqECH/U3Cgb1x6Hhl9mFbHxQ8GaX4+8C6l4U1dM217EVWQKC0Mg5SRf9pWAPvyO9fBfwh8Y+I/2cvjPf6D4kgm/sxpha6tbKch0BylzGO5AO5f7ysV69AD9HazvEemQ6zoGoaRcY8m9tpLZ8jPyupU/zo0HVNO1vSbTVtJu4bywu4xLBPC25JEPQg/5x0rRPSgD4R/YH1Cfw38a/Efg69yklxZyRsh4/f20nI+u0yV93V8J+NjF8NP29bLVQ/k2Wo6hDcOQMAJdoYpCfYOzmvutelAC0UUUAFFFFAHyT/wUnvAnhHwlp+eZb+ebH+5GF/8AZ6+YP2b5vs/x58EyZx/xObdP++n2/wBa9y/4KSah5njLwnpIfP2fT57grn/npIFH/ouvn74LtJa/GXwazAqRrlkfwMqY/Q0AfrIOlFAooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDF8cSeX4M1uXps0+4bP0javkr/gmpHi58cyf7FiP/Rxr6s+Jz7Phv4mkPG3SLs/+QXr5Z/4JpD5PHLe9iP0moA+yaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArnPH3hTTPG/hDUfC+tI32G/i8uVlCl15BDIWBAYEcHHB5FdHRQB598L/g94A+HAMnhnQYor1lKtfzsZbhgeo3tyoPouBXn3jb9lD4ceJvGr+I/N1LS4biQy3dhZOiwyuTklcqTHuPULx6Yr6CooA5vwN4J8K+CNK/szwpolnpVsxBcQJ80jAYDOxyzn3YmukoooAKKKKACvkH/goj4F8zTNG+ItkMTWjrp17tGDsYs8TZ/wBlty/8DFfX1cb8avCaeOPhZ4h8LlQ0t7ZuLfIziZfnjP8A32q0AVPgF4wXx18IvD3iJpA9zPaLHd88ieP5JM/VlJ/Gu9r43/4J3eMpIn8RfDnUXZJUb+0LRHOCpGI5lwfQiM4/3q+yKACiiigAooooAK8X/aV+BmlfFvSI7u3aPTvEtmhW0vGX5JU6+VLjkpnoRypJIyCQfaKKAPzr8F+Ofi5+zXrraDrmjTvozSl20+8JNvLzzJbzLkKT6rkH+Jc17lb/ALaPgBtMM1x4b8RRXoX/AI90WJ0J9n3jj3x+FfSuraZp2rWbWWq2FrfWr/fhuYVkjb6qwIrzq+/Z9+Dd5cmef4f6SGPP7nfEv/fKOB+lAHwZ8TvGniT42fGBNX0nRJI7+cxW2nWVtulkREOVyQOTkli2AB7AV+nemi4Gn263eDcCJRKQc/PtG79c1ieDvAvg/wAHQvH4X8NaXpIcYZra3VXcf7Tfeb8TXS0AFFFFABQeBRQelAH5w/t26sNT/aF1C2V966bZW9oMdjs8wj85DXO3Wmpof7T2j6Wi7BZ67p0WPQq0IP65qHX5n+In7TdwY/3qax4nEUeOcxGcIv8A44ore+Ko8r9s67wMBfFdsQB2HmR0AfpOKWkHT8aWgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAOS+Mknl/CTxdJ/d0S7P/AJBevmj/AIJqD/Q/G5/27If+Oy19HfHmTyvgp41k/u6HeH/yE1fOX/BNIf8AEu8bn/prZf8AoMtAH2HRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABQelFFAHwH8X45vgb+15beLbONo9KvbhdRCoMB4ZiUuUGPQmQge6mvvOyuYbyzhvLWVZYJ0WSJ0OQ6MMqw9iCDXz1+3r4E/wCEm+E6eJ7SHffeHJTOxA+ZrZ8LIPoCEb6Kad+wn8RF8W/DD/hF7643ap4cKwDc3zPatnym99uCnttX1oA+jKKKKACiiigAooooAKKKKACiiigAooooAK474z+IV8JfCnxN4hLFXs9OmaIg4/eMpVB/30y12NfL3/BQ7xcul/DHTfCcEgFxrV6JJVDc+RDhjke7tH/3yaAPnv8AYi8PnXf2gtKuZFZodJhnv5DjIyqbEz/wN1P4Uz41nyv2ydRPp4ltW/8AHojXtf8AwTk8JvBofiTxpPEQLuVLC2YjGVjG+Qj2LMg/4Ca8T+Ph8v8AbC1Y+mv2jfpEaAP0oHT8aWkHT8aWgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPP8A9ox/L+BPjhv+oHdD84yK+ff+CaY/4lfjc/8ATey/9Blr3z9pg7fgF43P/UHnH5rivBP+Caf/ACCvHH/Xey/9BloA+waKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAKmq2NrqenXOm30SzWt1E8M0bDIdHUqyn6gmvzk0K+1X9nH9pSaKcTSWFpcGC4UZ/0nT5CCrD1O3aw/wBpcV+k1fMP7eHwrfxP4Oj8d6NbF9V0KMi7RFy01nnJPuYzlv8AdL+goA+k9LvrPU9OttRsLiO4tLqJZoJozlZEYAqwPoQRVuvjL9hH4zBFj+FfiO62gszaJPI3GTktbEn3yyf8CX+6K+zaACiiigAooooAKKKKACiiigAooooAQnAr81v2r/GM/wAS/jtc2ejbrq1sZE0jTY4znzWD4Zl9d8jNg+gWvrz9rz4qx/Dj4bT2un3QXxDrSNa2Cq3zxIRiSf22g4B/vMvoa+ff2CfhbJrviuT4i6vATpukOY7AOvE12Ryw9QinP+8w9DQB9ffBvwbB4B+Gmi+FIdheytlFw6jh52+aRvxct+GK+CP2jT5P7XutN6azaN/45Ca/Shulfmv+1H+7/a011vTUbNv/ACFDQB+lA6fjS0gpaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA80/ahO39n3xqf8AqFSD8yK8K/4Jp/8AIK8cf9fFn/6DLXuP7VR2/s9eND/1DWH5uteGf8E0/wDkG+OP+u9n/wCgy0AfYVFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABUM0SSxtFKiujKVZWGQQeoI7ipqKAPzp/av+C9/wDC3xePE/h2KaPwxe3HmWssJINhNnd5RYcqARlG9BjqvP0L+yj+0LZePbK28JeLruO28VQoEilchU1JQPvL2EuPvL36r3A998RaPpmv6Ld6RrFjDf6feRmK4t5l3JIp7H+YI5BAI5r4b+O/7K/ifwlfza/8Oxda3pKv5q20RJvbTByMAcyAdmX5vUcZIB98UV8HfCL9rXxR4W2aH8Q9OuNctoD5ZulxHfRY4wwbCyEf7W1vUmvqjwB8b/hj44CJoviqyjun/wCXO8f7POD6BXxuP+6TQB6TRTAysAQQQeh7Gn0AFFFFABRRSZAoAWuV+JXjfQPh74TvPEviO7EFpAMRoCDJPIR8saL/ABM2Pw5JwATXK/GX44+BvhfZSpqeopfauAfK0uzcNOx7b+0a+7fgD0r4m1fVviX+038TorSCHeqE+RbRlhaadATy7t/Nj8zHAA6AABbW/jP9pj44maXMcczAyMoLRaZZKeAPUjOB/fdvc4/RHwT4b0nwf4W0/wANaHai20+whEUK9ScdWY92YksT3JNc18EPhdoHwq8HpoekKZrmUiS+vnUCS6lxjJ9FHIVegHqSSfQaAEPQ1+bH7WvyftWa63T/AEqzP/kGKv0oNfmz+2GNn7UmuN6y2bf+QYqAP0lU5GfWlqOA5gQ+qj+VSUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB5b+1jx+zt4zP8A04Af+RErw/8A4Jp/8gzxx/13s/8A0GWvbf2tzj9nPxkf+nJB/wCRUrxT/gmn/wAgrxv/ANfFn/6DLQB9gUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBwvxD+E/gDx8jHxT4Xsby4YYF0imK4X6SJhvwJIrwXxj+xV4fut0vhXxbf6cx5EF9Ctwg9gy7GA/A19aUUAfDyfBP9pr4eknwZ4uN9bRjKw2eqMqkD/plOAn4DNPm+MH7VXg4KPEXg+W/jThpLjRGZSB33wEL+Nfb1JgduPpQB8Op+2l40s3MOp+BdI80dVE00J/Js1K/wC27rxXC+AtMVvU6g5H5bK+z9R0jStSXZqOm2d4vpPbpIP/AB4GubvvhZ8Nr0lrrwF4ZkY9T/ZkQP6KKAPjnWf20fiJcxlNN0Dw5Yk/xtHLMw/NwP0rzjxX8efjF40kNlc+LNQSOb5FtdMQW4b/AGcRgM34k1+gUXwb+FUbbl+HvhrPvp8Z/mK6TQvC3hnQ8HRfDuk6YQMZtLOOI/mqg0AfA/wZ/Zf8e+ObuPU/E8c/hrRnYO8t3GftU4PJ2RnkZ/vPgc5w3SvuX4Z/D/wt8O/DceheFtNS0txhpZD80tw/96R+rN+g6AAcV1tFABRRRQAGvzb/AG0ht/ac1o+v2M/+QY6/SQ1+b37ba7f2mNWPrHZn/wAhJQB+jVic2cJ9UX+Qqeq2mnOn259Yl/8AQRVmgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPJ/2vT/xjh4x/wCvWMf+R468Y/4Jpj/iTeNj/wBPNn/6BLXsv7YJx+zd4x/694f/AEfHXj3/AATXX/infGbet3aj/wAck/xoA+u6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/OP9uMbf2lNSPrbWZ/8AIa1+jlfHv7UPwB+Ifj34xyeJvDtrp02nTwW8ZeW8WNkKLtYsp5x9M0AfXGknOmWv/XFP/QRVqq9lEYLOGFiCyRqhI6EgAf0qxQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHkn7Yh/4xt8Yf8AXvD/AOlEdeTf8E249vg3xbL/AHtRgX8oif619E/FXwda/ED4f6r4Pu7yWzh1FER54lDMm11cEA8HlQKxvgV8K9H+E/hJ9B0q7uL+Se5a5ubqdQrSOQFGFHCqFUADnvzzQB6JRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAEVxEk0TRtuw3XaxU/mOakAwMClooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q==" />
                </div>
                `
               
                // htmlContent = htmlContent.replace(/amp;/g,'').replace(/\/#\/reference_view\?viewId=\d+&rowid=/gi,'./article_23.html')
                const $ = cheerio.load(htmlContent, { decodeEntities: false})
                $('a').each((idx,elem)=>{
                    var href = $(elem).attr('href')
                    if (href.indexOf('rowId') > 0) {
                       var article_id = href.split('=')[href.split('=').length - 1]
                       $(elem).attr('href','/ref/index.html?' + article_id)
                    }
                })
                fs.writeFile(filepath,$.html(),{ flag: 'wx' }, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                   
                });
                count++ 
        
            });
            console.log(count + " Articles were updated")
        });
        
    }
}