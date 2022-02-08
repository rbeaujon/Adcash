<?PHP 

require (__DIR__."/db.php"); 

abstract class ProductService{

    // Attributes
    public $id;
    public $myswitch;
    public $sku;
    public $name;
    public $price;
    public $items;
    public $jsonList;
 
    public function __construct() { } 

    abstract function create($id, $info, $category);
    public static function delete($items){
        
            // new inst from db
            $conn = new connectionDB();
            
            // my new conexion to db
            $conn->createConnection();
        
           //delete items in massive mode from products the list from functions massdelete
            
            $sql_del= "DELETE FROM posts WHERE id in ($items)";
            
            $conn->executeQuery($sql_del);
        
            // Closing the connection with BD
            $conn->closeConnection();
        
    }
    public static function getAllPosts(){

        $conn = new connectionDB();
   
        $conn->createConnection();

        $query= "SELECT * FROM posts";
        $result=$conn->executeQuery($query);
        $posts = []; 
       
        while($row = $result->fetch_assoc()){   
            array_push($posts, $row); // get all server available in DB
        }

        // Closing the connection with BD
        $conn->closeConnection();
        
        return $posts; 

    }
    public static function getAllCategories(){

        $conn = new connectionDB();

        $conn->createConnection();

        $query= "SELECT * FROM categories";
        $result=$conn->executeQuery($query);
        $categories = []; 
    
    
        while($row = $result->fetch_assoc()){
            array_push($categories, $row); //get all hosting available in DB
        }

        // Closing the connection with BD
        $conn->closeConnection();

        return $categories ;

    }
}

class products extends ProductService {


    public function create($id, $info, $category){
     // Method to create one dvd in the DB

            // my new instance of DB
            $conn = new connectionDB();
            
            // Create a new connection with DB
            $conn->createConnection();

            // registering in db according to the type of the item
        
            $sql_insert = "INSERT INTO posts (id, info, category) VALUES ($id, '$info', $category)";
            $conn->executeQuery($sql_insert);

            // Closing the connection with BD
            $conn->closeConnection();       
    }   

    public function update($id, $info, $category){
        // Method to create one dvd in the DB
   
               // my new instance of DB
               $conn = new connectionDB();
               
               // Create a new connection with DB
               $conn->createConnection();
   
               // registering in db according to the type of the item
           
               $sql_insert = "UPDATE posts SET info='$info', category=$category WHERE id=$id";
               $conn->executeQuery($sql_insert);
   
               // Closing the connection with BD
               $conn->closeConnection();       
       }  

}    
?>