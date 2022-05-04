using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController:BaseApiController
    {
        private readonly StoreContext _context;
        public OrdersController(StoreContext context)
        {
            this._context = context;
            
        }
        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetOrders()
        {
            return await _context.orders
                        .Include(o=>o.orderItems)
                        .Where(x=>x.BuyerId==User.Identity.Name)
                        .ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>>GetOrder (int id)
        {
            return await _context.orders
                        .Include(x=>x.orderItems)
                        .Where(x=>x.BuyerId==User.Identity.Name && x.Id==id)
                        .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
        {
            var basket= await _context.Baskets
        }
    }
}