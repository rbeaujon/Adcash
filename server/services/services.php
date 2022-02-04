<?PHP 

require (__DIR__."/db.php"); 


 class ServerServices{

    // Attributes
   
    public $jsonList;
 
    public function __construct() { } 

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

?>