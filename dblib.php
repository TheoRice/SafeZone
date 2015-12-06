<?php
    
    //Utility Library for SQL
    include "sqllib.php";
    class MyDB extends SQLLib{
       
        
        
        function __construct($user = "reader") {
            parent::__construct($user);
        }
        

        /**
         * 
         * Uses SQL object to create a table in the database
         * 
         * @param string $name table name
         * @param string-array $colArray columns to go into database
         */
        function createTable($name, $colArray){
            //Check type
            $isOk = 1;
            if(is_string($name) && gettype($colArray)=='array'){
                foreach($colArray as $key => $value){
                    if(!(is_string($key) || is_string($value))){
                        $isOk = 0;
                    }
                }
            }else{
                $isOk = 0;
            }
            
            //Create command string

            if($isOk){
                $sqlStr = 'CREATE TABLE ' . $name . ' (';
                $iter = 0;
                foreach($colArray as $colName => $colType){
                    if($iter<count($colArray)-1){
                        $sqlStr = $sqlStr . $colName . ' ' . $colType . ', ';
                    }else{
                        $sqlStr = $sqlStr . $colName . ' ' . $colType . ')';
                    }
                    $iter=$iter+1;
                }
                if(!$this->exec($sqlStr)){
                    echo "Warning: Error Executing Query: " . $sqlStr;
                }
            }
        }
        

        /**
         * 
         * Drops table $name
         * 
         * @param string $name table name
         */
        function dropTable($name){

            if(is_string($name)){
                if(!strpos($str, ';')){     //Checks for getting hacked !!!TODO!!! Write dontgethacked.php
                    $this->exec('DROP TABLE ' . $name);
                }
            }
            
        }
        
        
        /**
         * creates index for searching stuff faster. Wooooo
         * 
         * 
         * @param string $tblName table name
         * @param string $colName column to be indexed
         * @param string $indexName name of index (not very important, as long as its different each time)
         */
        function createIndex($tblName, $colName, $indexName){
            if(is_string($tblName)&&is_string($colName)&&is_string($indexName)){
                $this->exec('CREATE INDEX ' . $indexName . ' ON ' . $tblName . ' (' . $colName . ' ASC)');
            }
        }
        
        /**
         * Drops all tables in Database (for reset)
         */
        function dropAllTables(){
            $tblNames=$this->getTableList();
            if($tblNames){
                foreach($tblNames as $name){
                    echo "dropping table " . $name . "\n";
                    $this->exec('DROP TABLE ' . $name);
                }
            }
        }
        
        
        /**
         * Adds Entry to the database (does INSERT)
         * prints SQL string
         * 
         * @param mixed-array $dataArr as row to be inserted
         * @param string $tblName as table name
         */
        function addEntry($dataArr, $tblName){
            if(is_string($tblName)){
                $sqlStr = 'INSERT INTO ' . $tblName . ' (';
                foreach($dataArr as $colName => $element){
                    $sqlStr = $sqlStr  .  $colName . ', ';
                }
                $sqlStr = substr($sqlStr, 0, -2);
                $sqlStr = $sqlStr . ') VALUES (';
               
                foreach($dataArr as $colName => $element){
                    if($element=="NULL" || $element===NULL){
                        $sqlStr = $sqlStr . 'NULL' . ', ';
                    }else{
                        if(is_integer($element)||is_bool($element)){
                            $sqlStr = $sqlStr . $element . ', ';
                        }else{
                            $sqlStr = $sqlStr . '"' . $element . '", ';
                        }
                    }
                    
                }
                $sqlStr = substr($sqlStr, 0, -2);
                $sqlStr = $sqlStr . ')';
                echo $sqlStr . "\n";
                $this->exec($sqlStr);
            }
        }  

        function getReleMarkers() {
            $checkTime = time() - 86400;
            $twentyfour = $this->query('SELECT * FROM markers WHERE timecode > ' . $checkTime);
            $markers = [];
            while (($marker = $this->fetchArray($twentyfour, 'assoc'))!==NULL) {
                $markers[]=$marker;
            }
            return $markers;
        }
    }  
?>







