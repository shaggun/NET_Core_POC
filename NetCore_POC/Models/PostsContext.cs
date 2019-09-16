using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace NetCore_POC.Models
{
    public class PostsContext:DbContext
    {
        public PostsContext(DbContextOptions<PostsContext> options)
            :base(options)
        { }
        public DbSet<Post> posts { get; set; }
        
    }
}
