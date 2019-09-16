using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NetCore_POC.Models;

namespace NetCore_POC.Controllers
{
    [Route("api/[controller]")]
    public class PostsController:Controller
    {
        private readonly PostsContext _context;

        public PostsController(PostsContext context)
        {
            _context = context;

            if(_context.posts.Count()==0)
            {
                _context.posts.Add(new Post() { Title = "Cras interdum. Nunc sollicitudin commodo", Body = "lorem ipsum sodales purus, in molestie tortor nibh sit amet orci.", Date = "06/01/18, 1:08:54 PM", Author = "Slade" });
                _context.posts.Add(new Post() { Title = "sollicitudin commodo ipsum. Suspendisse non", Body = "Proin sed turpis nec mauris blandit mattis. Cras eget nisi dictum augue", Date = "28/01/18, 10:05:34 AM", Author = "Griffith" });
                _context.posts.Add(new Post() { Title = "risus odio, auctor vitae, aliquet", Body = "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec tincidunt. Donec", Date = "21/10/18, 3:00:50 PM", Author = "Tobias" });
                _context.posts.Add(new Post() { Title = "risus a ultricies adipiscing, enim", Body = "nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas nunc", Date = "23/03/19", Author = "Allistair" });
                _context.posts.Add(new Post() { Title = "vestibulum, neque sed dictum eleifend,", Body = "velit eget laoreet posuere, enim nisl elementum purus, accumsan interdum libero dui nec", Date = "26/04/19, 11:08:54 PM", Author = "Brett" });
                _context.posts.Add(new Post() { Title = "blandit at, nisi. Cum sociis", Body = "nisl. Quisque fringilla euismod enim. Etiam gravida molestie arcu. Sed eu nibh vulputate", Date = "25/07/19, 3:15:24 PM", Author = "Blake" });
                _context.SaveChanges();
            }
        }

        //[HttpGet]
        //public List<Post> GetPosts()
        //{
        //    return _context.posts.ToList();
        //}
        [HttpGet]
        public IActionResult GetPosts(int? page = 1, int? pageSize = 2)
        {
            if (!page.HasValue)
            {
                return Ok(new
                {
                    data = _context.posts.ToList(),

                });
            }

            // Determine the number of records to skip
            int skip = (page.GetValueOrDefault() - 1) * pageSize.GetValueOrDefault();

            
            int totalEntries = _context.posts.Count();
            var firstPage = 1;
            var lastPage = (int)Math.Ceiling(totalEntries / (float)pageSize.GetValueOrDefault());//Total pages
            var prevPage = page.GetValueOrDefault() > firstPage ? page.GetValueOrDefault() - 1: firstPage;
            var nextPage = page.GetValueOrDefault() < lastPage ? page.GetValueOrDefault() + 1 : lastPage;

            // Select posts based on paging parameters
            var paginatedPosts = _context.posts
                .OrderBy(c => c.Date)
                .Skip(skip)
                .Take(pageSize.GetValueOrDefault())
                .ToList();

            //Return the list of paginated posts
            return Ok(new
            {
                entries = paginatedPosts,
                pagination = new
                {
                    first = firstPage,
                    previous = prevPage,
                    next = nextPage,
                    last = lastPage,
                    entries = totalEntries,
                    current = page,
                    pageSize
                }
            });
   
        }


        [HttpPost]
        public IActionResult AddPost([FromBody]Post item)
        {
            _context.posts.Add(item);
            _context.SaveChanges();
                return Ok(new
                {
                    success = true,
                    returncode = "200"
                });
        }

        [HttpPatch]
        public IActionResult Update([FromBody]Post post)
        {
            var postToUpdate = _context.posts.Find(post.Id);

            if(postToUpdate == null)
            {
                return NotFound();
            }

            postToUpdate.Title = post.Title;
            postToUpdate.Body = post.Body;

            _context.posts.Update(postToUpdate);
            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var postToDelete = _context.posts.Find(id);
            if(postToDelete == null)
            {
                return NotFound();
            }
            _context.posts.Remove(postToDelete);
            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

    }
}


