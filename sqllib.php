<?php


    include "mysqllib.php";
    class SQLLib{
        
        private $sqlObj;
        
        public function __construct($user = "reader") {
            $this->sqlObj = new MySQLLib($user);
        }
        
        //$command is string
        function exec($command){
            return $this->sqlObj->exec($command);
        }
        
        //$query is string
        function query($query){
            return $this->sqlObj->query($query);
        }
        
        function fetchArray($result, $assoc = 'both'){
            return $this->sqlObj->fetchArray($result, $assoc);
        }
        
        function getColumnList($tblName){
            return $this->sqlObj->getColumnList($tblName);
        }
        
        function getTableList(){
            return $this->sqlObj->getTableList();
        }
        
    }


?>