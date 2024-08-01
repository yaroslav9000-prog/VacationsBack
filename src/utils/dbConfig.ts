class Config{
    public DB_CONN_STRING = "mongodb://localhost:27017/Vacations"

    public DB_NAME = "Vacations"
    
    public VACATIONS_COLLECTION = "Vacations"
    
    public USERS_COLLECTION = "Users"
    
    public FOLLOWERS_COLLECTION = "Followers"

}

export const dbConfig = new Config();