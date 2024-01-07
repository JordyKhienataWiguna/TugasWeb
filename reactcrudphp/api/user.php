<?php



error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin:* ');
header('Access-Control-Allow-Headers:* ');
header('Access-Control-Allow-Methods:* ');

$db_conn =mysqli_connect('localhost','root','','reactphp');
if($db_conn === false){
    die('Error: Could Not Connect!'. mysqli_connect_error());
}



$method = $_SERVER['REQUEST_METHOD'];
// echo "test-----".$method; die;
switch($method){

    case "GET":
    $alluser = mysqli_query($db_conn,'SELECT * FROM tb_users');
    if(mysqli_num_rows($alluser) > 0){
        while($row = mysqli_fetch_array($alluser)){
        $json_array["userdata"][] =array("id" => $row['id'], "npm" => $row["npm"], "nama" => $row["nama"], "kelas" => $row["kelas"],"jurusan" => $row["jurusan"], "noHP" => $row["noHP"],"status" => $row["status"] );
    }
        echo json_encode($json_array["userdata"]);
        return ;
    } else {
        echo json_encode(array("Result"=> "Please Check the Data"));
        return;
    }
    break;

    case "POST":
      $userpostdata = json_decode(file_get_contents("php://input"));
           $usernpm= $userpostdata->npm;
           $usernama= $userpostdata->nama;
           $userkelas= $userpostdata->kelas;
           $userjurusan= $userpostdata->jurusan;
           $usernoHP= $userpostdata->noHP;
           $status= $userpostdata->status;
           $result = mysqli_query($db_conn, "INSERT INTO tb_users(npm, nama, kelas, jurusan, noHP, status)
           values('$usernpm', '$usernama', '$userkelas', '$userjurusan', '$usernoHP', '$status')");

           if($result) {
            echo json_encode(["success"=>"User Added Successfully"]);
            return;
          } else {
              echo json_encode(["success"=>"Please Check the User Data!"]);
              return; 
           }
          break;
     


    case "PUT":
      $userUpdate= json_decode(file_get_contents("php://input"));

           $id= $userUpdate->id;
           $npm= $userUpdate->npm;
           $nama= $userUpdate->nama;
           $kelas= $userUpdate->kelas;
           $jurusan= $userUpdate->jurusan;
           $noHP = $userUpdate-> noHP;
           $status= $userUpdate->status;

           $updateData= mysqli_query($db_conn, "UPDATE tb_users SET npm='$npm', nama='$nama', kelas='$kelas', jurusan='$jurusan', noHP='$noHP', status='$status' WHERE id='$id'  ");
           if($updateData)
           {
             echo json_encode(["success"=>"User Record Update Successfully"]);
             return;
           } else {
               echo json_encode(["success"=>"Please Check the User Data!"]);
               return; 
           }
         // print_r($userUpdate); die;
          break;
       $userUpdate = json_decode(file_get_contents("php://input"));

        // ... data extraction and validation ...

        $updateData = mysqli_query($db_conn, "UPDATE tb_users SET npm='$npm', nama='$nama', kelas='$kelas', jurusan='$jurusan', noHP='$noHP', status='$status' WHERE id='$id'");

        if ($updateData) {
            $updatedUser = mysqli_fetch_assoc(mysqli_query($db_conn, "SELECT * FROM tb_users WHERE id = $id"));
            echo json_encode($updatedUser); // Display the updated user data
            return;
        } else {
            echo json_encode(["success" => "Please Check the User Data!"]);
            return;
        }
        break;
      

          case "DELETE":
            $path= explode('/', $_SERVER["REQUEST_URI"]);
            //echo "message userid------".$path[4]; die;
            $result= mysqli_query($db_conn, "DELETE FROM tb_users WHERE id= '$path[4]'");
            if($result)
            {
              echo json_encode(["success"=>"User Record Deleted Successfully"]);
              return;
            } else {
              echo json_encode(["Please Check the User Data!"]);
              return;
            }

          break;         

}

?>