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
                _context.posts.Add(new Post() { Title = "Cras interdum. Nunc sollicitudin commodo", Body = "lorem ipsum sodales purus, in molestie tortor nibh sit amet orci.", Date = "06/07/20", Author = "Slade" });
                _context.posts.Add(new Post() { Title = "sollicitudin commodo ipsum. Suspendisse non", Body = "Proin sed turpis nec mauris blandit mattis. Cras eget nisi dictum augue", Date = "28/01/19", Author = "Griffith" });
                _context.posts.Add(new Post() { Title = "risus odio, auctor vitae, aliquet", Body = "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec tincidunt. Donec", Date = "21/10/18", Author = "Tobias" });
                _context.posts.Add(new Post() { Title = "risus a ultricies adipiscing, enim", Body = "nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas nunc", Date = "23/03/19", Author = "Allistair" });
                _context.posts.Add(new Post() { Title = "vestibulum, neque sed dictum eleifend,", Body = "velit eget laoreet posuere, enim nisl elementum purus, accumsan interdum libero dui nec", Date = "22/11/19", Author = "Brett" });
                _context.posts.Add(new Post() { Title = "blandit at, nisi. Cum sociis", Body = "nisl. Quisque fringilla euismod enim. Etiam gravida molestie arcu. Sed eu nibh vulputate", Date = "25/03/19", Author = "Blake" });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public List<Post> GetPosts()
        {
            return _context.posts.ToList();
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
