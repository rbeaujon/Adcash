<?PHP
 /*
 * API controller to handle all comunication from user Posts data
 */ 
require (__DIR__."/../../services/productService.php");
require (__DIR__."/../baseApi.php");

class PostsApi extends api {

    public $jsonList;

    public function get(){
     
        $code = 200;
        $posts = ProductService::getAllPosts(); // Call a public  static method getAll to obtein all product in DB//

        if($posts == NULL || $posts === ""){

            $code = 500;
            api::responseCode($code);
        }
        else{ 
            
            api::responseCode($code);

            header('Content-Type: application/json; charset=utf-8'); 
            header("Access-Control-Allow-Origin: *");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
            header("Access-Control-Allow-Headers: X-Requested-With");
            header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');
            echo json_encode($posts, JSON_PRETTY_PRINT);
         
            


        }
    }
    public function post(){

       
        // $sku = isset($_POST['sku']);
        // $name = isset($_POST['name']);
        // $price = isset($_POST['price']);
        // $myswitch = isset($_POST['myswitch']);



        // $code = 200;

        // if($sku == NULL  || $name == NULL  || $price == NULL || $myswitch == NULL){

        //     $code = 400;
        //     api::responseCode($code); 

        // }  
        // else {
               
        //     api::responseCode($code);


        //     $sku = $_POST['sku'];
        //     $name = $_POST['name'];
        //     $price = $_POST['price'];
        //     $myswitch = $_POST['myswitch'];
                            
        //     $posts = new posts();
        //     $posts->create($myswitch, $sku, $name, $price);

        // }
    }
    public function put(){

    

        $code = 200;


       return api::responseCode($code); 

  
    }
    public function delete(){
            
        // $itemsToDelete = file_get_contents('php://input');
      
        // $code = 200;

        // if($itemsToDelete === "" || $itemsToDelete == NULL){

        //     $code = 400;
        //     api::responseCode($code);
            
        // }  
        // else {
        //     ProductService::delete($itemsToDelete);   
        //     api::responseCode($code);
        // };
       
    }
}

$PostsApi = new PostsApi();
$PostsApi->handleRequest();


?>