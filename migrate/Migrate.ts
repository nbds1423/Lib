import Nina from "../database/Nina";

class Migrate {

  constructor() {
    this.createTablePlayer();
    this.createTableGame();
  }

  private createTablePlayer() {
    return Nina.query(`CREATE TABLE players (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        userNum INTEGER UNIQUE,
        userCode VARCHAR(255) DEFAULT 'false',
        nickname VARCHAR(30) UNIQUE,
        gameStatus VARCHAR(255) DEFAULT 'Offline',
        mmr INTEGER DEFAULT 0,
        rank INTEGER DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`).run();
  }

  private createTableGame() {
    return Nina.query(`CREATE TABLE lastGame (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        ranked VARCHAR(10),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`).run();
  }

  private drop() {
    return Nina.query('DROP TABLE lastGame;').run();
  }

}

new Migrate();