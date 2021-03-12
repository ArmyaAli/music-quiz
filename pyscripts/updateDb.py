import requests
import pyodbc
from bs4 import BeautifulSoup
from decouple import config

CONN_STR = config('CONN_STR')

cnxn = pyodbc.connect(CONN_STR)
cursor = cnxn.cursor()

response = requests.get("https://spotifycharts.com/regional/us/daily/latest")
soup = BeautifulSoup(response.content, 'html.parser')

artists = soup.select('td.chart-table-track > span')
titles = soup.select('td.chart-table-track > strong')

# DELETE OUR SONGS LIST BEFORE GRABBING NEW 
cursor.execute("DELETE FROM [projects].[projects].[Songs]")

for i in range(len(artists)):
    artist =  artists[i].getText()[2:]
    title = titles[i].getText()
    
    if "'" in title:
        title = title.replace("'", "''")
    if "'" in artist:
        artist = artist.replace("'", "''")

    print(artist, title)
    cursor.execute(f"INSERT INTO [projects].[projects].[Songs](Song_Title, Artist) VALUES ('{title}', '{artist}');")
    cnxn.commit()

cursor.execute("Select * from [projects].[projects].[Songs]")





