using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext:DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet <Product>products{get;set;}
        public DbSet<Basket>Baskets{get;set;}
    }
}