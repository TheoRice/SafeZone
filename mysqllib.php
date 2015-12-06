<?php


    class MySQLLib{
        
        private static $assoc_table = array('both' => MYSQLI_BOTH, 'assoc' => MYSQLI_ASSOC, 'num' => MYSQLI_NUM);
        private $connection;
        
        function __construct($user="reader"){
            $properties=  parse_ini_file("private/safezone.ini");
            $this->connection=new mysqli(
                    $properties["safezone.database.mysql.hostname"], 
                    $properties["safezone.database.mysql.user." . $user],
                    $properties["safezone.database.mysql.password." . $user],
                    $properties["safezone.database.mysql.db"],
                    $properties["safezone.database.mysql.port"]
                );
            mysqli_select_db($this->connection, $properties["safezone.database.mysql.schema"]);
            if($this->connection->connect_errno){
                echo "Database Connectivity Error: " . $this->connection->connect_errno;
            }
            
            
        }
        
        function __destruct(){
            $this->connection->close();
        }
        
        //$command is string
        function exec($command){
            $tmp = $this->connection->query($command);
            echo "\n" . mysqli_error($this->connection);
            return $tmp;
        }
        
        //$query is string
        function query($query){
            return $this->connection->query($query);
        }
        
        //$result is query obj
        //$assoc is string
        function fetchArray($result, $assoc = 'both'){
            if(!$result){
                return FALSE;
            }else{
                return $result->fetch_array(MySQLLib::$assoc_table[$assoc]);
            }
             
        }
        
        function getColumnList($tblName){
            $res = $this->query('SELECT * FROM ' . $tblName . ' LIMIT 1');
            $full_info = $res->fetch_fields();
            $colNames = array();
            for($i=0; $i<count($full_info); $i++){
                $colNames[$i] = $full_info[$i]->name;
            }
            return $colNames;
        }
        
        function getTableList(){
            $result = $this->connection->query('SHOW TABLES');
            $tblNames = array();
            while($res = $this->fetchArray($result)){
                array_push($tblNames, $res[0]);
            }
            return $tblNames;
        }
        
        
    }
    
    


?>