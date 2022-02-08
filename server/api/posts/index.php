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


        $data = json_decode(file_get_contents('php://input'), true);
        print_r($data);
        echo $data["METHOD POST"];
        
        $code = 200;
        api::responseCode($code);
       
        // $updatePost = isset($_POST['updatePost']);
       


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
        // Raw data from the request and it converts into a PHP object
        $dataRaw = file_get_contents('php://input');
        $data = json_decode($dataRaw);

        //Variables from request 
        $id = $data->id;
        $info = $data->info;
        $category = $data->category;

         // Sending the API json response

        if($id == NULL || $info == NULL || $info === "" || $category == NULL){

            $code = 400;

            header('Content-type:application/json');
            echo  $dataRaw ;
            api::responseCode($code); 

        }  
        else {
        
            $product = new products();
            $product->update($id, $info, $category);


            header('Content-type:application/json');
            echo $dataRaw;
    
            api::responseCode($code); 

         }
  
    }
    public function delete(){

       // Raw data from the request and it converts into a PHP object
       $dataRaw = file_get_contents('php://input');
      
        $code = 200;

        // Sending the API json response

        if($dataRaw === "" || $dataRaw == NULL){

            $code = 400;
            
            header('Content-type:application/json');
            echo $dataRaw;
            api::responseCode($code);
            
        }  
        else {
            ProductService::delete($dataRaw); 
            
            header('Content-type:application/json');
            echo $dataRaw;
            api::responseCode($code);
        };
       
    }
}

$PostsApi = new PostsApi();
$PostsApi->handleRequest();


