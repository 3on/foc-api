API documentation
=================

GET `/torrents`  
List all the torrents.  
Parameters:  
  - ipp: Items per page (10-100)
  - page: Page number
  - owner: Filter by user who uploaded the torrent
  - fields: Comma-separated list of fields to include in the response

GET `/torrents/:id`  
Recover torrent info for a specific torrent.  
Parameters:  
  - id: Torrent ID
