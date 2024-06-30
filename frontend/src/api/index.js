import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
  });

export function getTableRows({dbName, tableName}){
    try {
        return instance.get(`${tableName}`);
    } catch (error) {
        console.error('Error in getTableRows fn', error.message);
        throw error;
    }
}

export function getAllDbs(){
    try {
        return ['db_1', 'db_2', 'db_3'];
    } catch (error) {
        console.error('Error in getAllDbs fn', error.message);
        throw error;
    }
}

export function getTableNamesByDbName({dbName}){
    try {
        return ['todos', 'users', 'posts'];
    } catch (error) {
        console.error('Error in getTableNamesByDbName fn', error.message);
        throw error;
    }
}
