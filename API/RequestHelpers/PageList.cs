using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.RequestHelpers
{
    public class PageList<T> : List<T>
    {
        public PageList(List<T>items, int count, int pageNumber, int pageSize)
        {
            MetaData = new MetaData
            {
                TotalCount=count,
                PageSize=pageNumber,
                TotalPages=(int)Math.Ceiling(count/(double)pageSize)
            };

            AddRange(items);
        }

        public MetaData MetaData {get;set;}

        public static async Task<PageList<T>>ToPageList(IQueryable<T> query, int pageNumber, int pageSize) 
                                               
         {
             var count= await query.CountAsync();
             var items=await query.Skip((pageNumber-1)* pageSize).Take(pageSize).ToListAsync();

             return new PageList<T>(items, count, pageNumber, pageSize);
             
         }
    }
}