import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Static Generation
// const vendorsDirectory = path.join(process.cwd(), 'vendors')

// export function getSortedVendorsData() {
//   // Get file names under /posts
//   const fileNames = fs.readdirSync(vendorsDirectory)
//   const allVendorsData = fileNames.map(fileName => {
//     // Remove ".md" from file name to get id
//     const id = fileName.replace(/\.md$/, '')

//     // Read markdown file as string
//     const fullPath = path.join(vendorsDirectory, fileName)
//     const fileContents = fs.readFileSync(fullPath, 'utf8')

//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents)

//     // Combine the data with the id
//     return {
//       id,
//       ...matterResult.data
//     }
//   })
//   // Sort posts by date
//   return allVendorsData.sort((a, b) => {
//     if (a.date < b.date) {
//       return 1
//     } else {
//       return -1
//     }
//   })
// }

// Server-Side Rendering
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://sam:123@clusterbase.cfeqs.mongodb.net/quickeatz?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function getSortedVendorsData() {
    if (err) throw err;
    // Instead of the file system,
    // fetch post data from a database
    client.connect(err => {
        if (err) throw err;
        const collection = client.db("quickeatz").collection("vendors");
        const allVendorsData = collection.find({ first_name : "Clarence"}).toArray(function(err, result) {
            if (err) throw err;
            // console.log(result);
            return result;
          })
        client.close();
    });
    return allVendorsData;
}