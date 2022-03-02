using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.RequestHelpers;
using System.Text.Json;

namespace API.Controllers
{
    
    public class ProductsController:BaseApiController
    {
        private readonly StoreContext _context;
 
        public ProductsController(StoreContext context)
        {
            this._context = context;
       
            
        }
        [HttpGet]
        public async Task <ActionResult<PageList<Product>>>GetProducts([FromQuery]ProductParams productParams)
        {
            var query = _context.products
                               .Sort(productParams.OrderBy)
                                .Search(productParams.SearchTerm)
                                .Filter(productParams.Brands, productParams.Types).AsQueryable();
                               
         
            var products= await PageList<Product>.ToPageList(query, productParams.PageNumber, productParams.PageSize);

           Response.AddPaginationHeader(products.MetaData);

            return products;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>>GetProduct(int id)
        {
            var product= await _context.products.FindAsync(id);

            if (product == null) return NotFound();
            return product;

        }
    }
}