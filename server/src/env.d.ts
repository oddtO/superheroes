declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DBUSER: string;
      DBPASSWORD: string;
      DBHOST: string;
      DBPORT: string;
      DBDATABASE: string;
      PGURI: string;
      CLIENT_URL: string;
    }
  }
}

export {}
