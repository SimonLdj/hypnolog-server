using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VDebugLib;

namespace VDebugExample
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Start example");
            VDebug.Init();

            VDebug.Log("Example 1");
            VDebug.Log("Example 2");
            VDebug.Log("Example 3");
            VDebug.Log(new
            {
                Name = "Example",
                Value = new
                {
                    VarA = 4,
                    varB = 9
                }
            });
        }
    }
}
