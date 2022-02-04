<?PHP

require (__DIR__."/../services/services.php");


    $server = ServerServices::getAllCategories();  
    header('Content-Type: application/json; charset=utf-8'); 
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
    header("Access-Control-Allow-Headers: X-Requested-With");
    header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');
    echo json_encode($server, JSON_PRETTY_PRINT);
 
                
        

?>