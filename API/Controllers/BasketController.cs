using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.DTOs;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            this._context = context;

        }

        [HttpGet(Name="GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket(GetBuyerId());

            if (basket == null)
            {
                return NotFound();
            }

            return MapBasketToDto(basket);
        }

       
        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {

            var basket=await RetrieveBasket(GetBuyerId());
            if (basket==null) basket=CreateBasket();
            var product=await _context.products.FindAsync(productId);
            if (product==null) return BadRequest(new ProblemDetails{Title="Product Not Found"});
            basket.AddItem(product, quantity);

             var result=await _context.SaveChangesAsync()>0;
             if (result) return CreatedAtRoute("GetBasket",MapBasketToDto(basket));

             return BadRequest(new ProblemDetails{Title="Problem saving item to basket"});
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasetItem(int productId, int quantity)
        {
            var basket=await RetrieveBasket(GetBuyerId());
            if ( basket==null) return NotFound();

            basket.RemoveItem(productId, quantity);
            var result=await _context.SaveChangesAsync() >0;
             if (result) return Ok();
             return BadRequest(new ProblemDetails{Title="Could not remove item from the basket"});
        }
        private async Task<Basket> RetrieveBasket(string buyderId)
        {
            if (string.IsNullOrEmpty(buyderId))
             {
                 Response.Cookies.Delete("buyerId");
                 return null;
            }
            return await _context.Baskets
                         .Include(i => i.Items)
                         .ThenInclude(p => p.Product)
                         .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["BuyerId"]);
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }
 private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                buyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }

        private Basket CreateBasket()
        {
            var buyerId=Guid.NewGuid().ToString();
            var cookieOptions=new CookieOptions {IsEssential=true, Expires=DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket= new Basket{BuyerId=buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}