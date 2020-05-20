-- # -- #  DROP ALL CREATE ALL FOR POSTGRES -- # --
DROP TABLE public.item CASCADE
;
DROP TABLE public.unit CASCADE
;
DROP TABLE public.square CASCADE
;

CREATE TABLE "item" (
	"id"	BIGSERIAL NOT NULL PRIMARY KEY,
	"manufacturer"	VARCHAR(32),
	"catalog_no"	VARCHAR(32),
	"catalog_fullname"	VARCHAR(256),
	"color_primary"	VARCHAR(32),
	"color_secondary"	VARCHAR(32),
	"is_snapback"	VARCHAR(32),
	"is_adjustable"	VARCHAR(32),
	"is_flexfit"	VARCHAR(32),
	"is_youth"		VARCHAR(32),
	"is_fitted"		VARCHAR(32),
	"is_unstructured"	VARCHAR(32),
	"has_curvedbill"	VARCHAR(32),
	"has_flatbill"	VARCHAR(32),
	"has_meshback"	VARCHAR(32),
	"inv_lowinstock"	VARCHAR(32),
	"inv_outofstock"	VARCHAR(32),
	"imagegrid_url"	VARCHAR(256),
	"imagelist_url"	VARCHAR(256),
	"product_url"	VARCHAR(256)
)
;

CREATE TABLE "unit" (
	"id"	BIGSERIAL NOT NULL PRIMARY KEY,		
	"square_id"	INTEGER,
	"pstn_rowcol"	VARCHAR(32),
	"unique_tag"	VARCHAR(32) UNIQUE,
	"mainitem_id"	VARCHAR(32),
	"maininv_out"	VARCHAR(32),
	"dispitem_id"	VARCHAR(32)
)
;

CREATE TABLE "square" (
	"id"	BIGSERIAL NOT NULL PRIMARY KEY,	
	"name"	VARCHAR(32) NOT NULL,
	"row_count"	INTEGER NOT NULL,
	"col_count"	INTEGER NOT NULL
)
;

-- # -- # -- # -- # -- END # -- # -- # -- # -- 

-- ## -- ## this is only for the JS implement ex ##-- ## 
DROP TABLE public.city CASCADE
;
CREATE TABLE city (
	"id"	BIGSERIAL NOT NULL PRIMARY KEY,
	state VARCHAR(2), 
	name VARCHAR(50) 
)
;
-- ## -- ## -- ## --END ## -- ## -- ## -- ## 


DROP TABLE public.item CASCADE
;


CREATE TABLE "item" (
	"id"	BIGSERIAL NOT NULL PRIMARY KEY,
	"manufacturer"	VARCHAR(32),
	"catalog_no"	VARCHAR(32),
	"catalog_fullname"	VARCHAR(256),
	"color_primary"	VARCHAR(32),
	"color_secondary"	VARCHAR(32),
	"is_snapback"	VARCHAR(32),
	"is_adjustable"	VARCHAR(32),
	"is_flexfit"	VARCHAR(32),
	"is_youth"		VARCHAR(32),
	"is_fitted"		VARCHAR(32),
	"is_unstructured"	VARCHAR(32),
	"has_curvedbill"	VARCHAR(32),
	"has_flatbill"	VARCHAR(32),
	"has_meshback"	VARCHAR(32),
	"inv_lowinstock"	VARCHAR(32),
	"inv_outofstock"	VARCHAR(32),
	"imagegrid_url"	VARCHAR(256),
	"imagelist_url"	VARCHAR(256),
	"product_url"	VARCHAR(256)
)
;
DROP TABLE public.choice CASCADE
;

CREATE TABLE choice (
	"id" BIGSERIAL NOT NULL PRIMARY KEY,
	"name"	VARCHAR(50),
	"extra"	VARCHAR(50)
)
;

--   \d+                 list tables, views, and sequences
--   \d+  NAME           describe table, view, sequence, or index

DROP TABLE public.item CASCADE
;

DROP TABLE public.unit CASCADE
;


CREATE TABLE "unit" (
	"id" BIGSERIAL NOT NULL PRIMARY KEY,
	"square_id"	INTEGER,
	"pstn_rowcol"	VARCHAR(32),
	"unique_tag"	VARCHAR(32),
	"mainitem_id"	VARCHAR(32),
	"maininv_out"	VARCHAR(32),
	"dispitem_id"	VARCHAR(32)
)
;
DROP TABLE public.square CASCADE
;
TRUNCATE TABLE public.square CASCADE
;

CREATE TABLE "square" (
	"id" BIGSERIAL NOT NULL PRIMARY KEY,
	"name"	VARCHAR(32) NOT NULL,
	"row_count"	INTEGER NOT NULL,
	"col_count"	INTEGER NOT NULL
)
;


CREATE TABLE "item" (
	"id"	BIGSERIAL NOT NULL PRIMARY KEY,
	"manufacturer"	VARCHAR(32),
	"catalog_no"	VARCHAR(64),
	"catalog_fullname"	VARCHAR(256),
	"imagewhtbg_url"	VARCHAR(256),
	"imageclean_url"	VARCHAR(256),
	"product_url"	VARCHAR(256),
	"color_primary"	VARCHAR(32),
	"color_secondary"	VARCHAR(32),
	"is_snapback"	VARCHAR(32),
	"is_adjustable"	VARCHAR(32),
	"is_flexfit"	VARCHAR(32),
	"is_youth"	VARCHAR(32),
	"is_fitted"	VARCHAR(32),
	"has_structcrwn"	VARCHAR(32),
	"has_curvedbill"	VARCHAR(32),
	"has_flatbill"	VARCHAR(32),
	"inv_lowinstock"	VARCHAR(32),
	"inv_outofstock"	VARCHAR(32)
)
;


-- WORKS
-- now drop the table try add again
DROP TABLE public.user CASCADE;

-- STEP I: create table in sql
CREATE TABLE "user" (
		"id"	BIGSERIAL NOT NULL PRIMARY KEY,
		"username"	VARCHAR(20) NOT NULL UNIQUE,
		"email"	VARCHAR(120) NOT NULL UNIQUE,
		"image_file"	VARCHAR(255) NOT NULL,
		"password"	VARCHAR(255) NOT NULL
	)
	

-- delete all data and related records
TRUNCATE TABLE public.user CASCADE;
-- >> deletes posts with FK
--     NOTICE:  truncate cascades to table "post"

-- postgresql edt, need to run first in psql shell

	CREATE TABLE "user" (
		"id"	BIGSERIAL NOT NULL PRIMARY KEY,
		"username"	VARCHAR(20) NOT NULL UNIQUE,
		"email"	VARCHAR(120) NOT NULL UNIQUE,
		"image_file"	VARCHAR(255) NOT NULL,
		"password"	VARCHAR(255) NOT NULL
	);

-- psql
CREATE TABLE item (
	id BIGSERIAL NOT NULL PRIMARY KEY, 
	make VARCHAR(16), 
	model VARCHAR(16), 
	year VARCHAR(16), 
	body_type VARCHAR(16), 
	dest_id VARCHAR(16) , 
	ship_status VARCHAR(16) , 
	date_posted TIMESTAMP  
);

-- sqlite 
CREATE TABLE "item" (
	"id"	INTEGER NOT NULL,
	"make"	VARCHAR(16),
	"model"	VARCHAR(16),
	"year"	VARCHAR(16),
	"body_type"	VARCHAR(16),
	"dest_id"	VARCHAR(16),
	"ship_status"	VARCHAR(16),
	"date_posted"	DATETIME,
	PRIMARY KEY("id")
)

-- Query all rows and columns from a table
SELECT * FROM
t

-- Delete the table from the database
DROP TABLE
t CASCADE

-- -- Remove all data in a table
TRUNCATE TABLE t CASCADE

TRUNCATE TABLE public.pair CASCADE;
DROP TABLE public.pair CASCADE;

-- delete * from public.

-- psql
CREATE TABLE post (
	id BIGSERIAL NOT NULL PRIMARY KEY, 
	title VARCHAR(100) NOT NULL, 
	date_posted TIMESTAMP NOT NULL, 
	content TEXT NOT NULL, 
	user_id BIGINT NOT NULL REFERENCES public.user 
)

-- postgresql edt, need to run first in psql shell

	CREATE TABLE "user" (
		"id"	BIGSERIAL NOT NULL PRIMARY KEY,
		"username"	VARCHAR(20) NOT NULL UNIQUE,
		"email"	VARCHAR(120) NOT NULL UNIQUE,
		"image_file"	VARCHAR(255) NOT NULL,
		"password"	VARCHAR(255) NOT NULL,
		"imp_pts"	INTEGER,
		"urg_pts"	INTEGER,
		"total_pts"	INTEGER,
		"imp_perc"	INTEGER,
		"urg_perc"	INTEGER,
		"avatar_img"	TEXT,
		"avatar_mode"	TEXT
	);


-- SQLITE
CREATE TABLE "user" (
	"id"	INTEGER NOT NULL,
	"username"	VARCHAR(20) NOT NULL UNIQUE,
	"email"	VARCHAR(120) NOT NULL UNIQUE,
	"image_file"	VARCHAR(20) NOT NULL,
	"password"	VARCHAR(120) NOT NULL,
	"imp_pts"	INTEGER,
	"urg_pts"	INTEGER,
	"total_pts"	INTEGER,
	"imp_perc"	INTEGER,
	"urg_perc"	INTEGER,
	"avatar_img"	BLOB,
	"avatar_mode"	TEXT,
	PRIMARY KEY("id")
)

ALTER TABLE public.user ALTER COLUMN user.password TYPE VARCHAR(255)
;

-- sqlite browser copy create statement
CREATE TABLE post (
	id INTEGER NOT NULL, 
	title VARCHAR(100) NOT NULL, 
	date_posted DATETIME NOT NULL, 
	content TEXT NOT NULL, 
	user_id INTEGER NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES user (id)
)


-- General
	-- show PostgreSQL usage and distribution terms
  -- \crosstabview [COLUMNS] execute query and display results in crosstab
  -- \errverbose            show most recent error message at maximum verbosity
  -- \g [FILE] or ;         execute query (and send results to file or |pipe)
  -- \gdesc                 describe result of query, without executing it
  -- \gexec                 execute query, then execute each value in its result
  -- \gset [PREFIX]         execute query and store results in psql variables
  -- \gx [FILE]             as \g, but forces expanded output mode
  -- \q                     quit psql
  -- \watch [SEC]           execute query every SEC seconds

-- Help
--   \? [commands]          show help on backslash commands
--   \? options             show help on psql command-line options
--   \? variables           show help on special variables
--   \h [NAME]              help on syntax of SQL commands, * for all commands

-- Query Buffer
--   \e [FILE] [LINE]       edit the query buffer (or file) with external editor
--   \ef [FUNCNAME [LINE]]  edit function definition with external editor
--   \ev [VIEWNAME [LINE]]  edit view definition with external editor
--   \p                     show the contents of the query buffer
--   \r                     reset (clear) the query buffer
--   \w FILE                write query buffer to file

-- Input/Output
--   \copy ...              perform SQL COPY with data stream to the client host
--   \echo [STRING]         write string to standard output
--   \i FILE                execute commands from file
--   \ir FILE               as \i, but relative to location of current script
--   \o [FILE]              send all query results to file or |pipe
--   \qecho [STRING]        write string to query output stream (see \o)

-- Conditional
--   \if EXPR               begin conditional block
--   \elif EXPR             alternative within current conditional block
--   \else                  final alternative within current conditional block
--   \endif                 end conditional block

-- Informational
--   (options: S = show system objects, + = additional detail)
--   \d[S+]                 list tables, views, and sequences
--   \d[S+]  NAME           describe table, view, sequence, or index
--   \da[S]  [PATTERN]      list aggregates
--   \dA[+]  [PATTERN]      list access methods
--   \db[+]  [PATTERN]      list tablespaces
--   \dc[S+] [PATTERN]      list conversions
--   \dC[+]  [PATTERN]      list casts
--   \dd[S]  [PATTERN]      show object descriptions not displayed elsewhere
--   \dD[S+] [PATTERN]      list domains
--   \ddp    [PATTERN]      list default privileges
--   \dE[S+] [PATTERN]      list foreign tables
--   \det[+] [PATTERN]      list foreign tables
--   \des[+] [PATTERN]      list foreign servers
--   \deu[+] [PATTERN]      list user mappings
--   \dew[+] [PATTERN]      list foreign-data wrappers
--   \df[anptw][S+] [PATRN] list [only agg/normal/procedures/trigger/window] functions
--   \dF[+]  [PATTERN]      list text search configurations
--   \dFd[+] [PATTERN]      list text search dictionaries
--   \dFp[+] [PATTERN]      list text search parsers
--   \dFt[+] [PATTERN]      list text search templates
--   \dg[S+] [PATTERN]      list roles
--   \di[S+] [PATTERN]      list indexes
--   \dl                    list large objects, same as \lo_list
--   \dL[S+] [PATTERN]      list procedural languages
--   \dm[S+] [PATTERN]      list materialized views
--   \dn[S+] [PATTERN]      list schemas
--   \do[S]  [PATTERN]      list operators
--   \dO[S+] [PATTERN]      list collations
--   \dp     [PATTERN]      list table, view, and sequence access privileges
--   \dP[itn+] [PATTERN]    list [only index/table] partitioned relations [n=nested]
--   \drds [PATRN1 [PATRN2]] list per-database role settings
--   \dRp[+] [PATTERN]      list replication publications
--   \dRs[+] [PATTERN]      list replication subscriptions
--   \ds[S+] [PATTERN]      list sequences
--   \dt[S+] [PATTERN]      list tables
--   \dT[S+] [PATTERN]      list data types
--   \du[S+] [PATTERN]      list roles
--   \dv[S+] [PATTERN]      list views
--   \dx[+]  [PATTERN]      list extensions
--   \dy     [PATTERN]      list event triggers
--   \l[+]   [PATTERN]      list databases
--   \sf[+]  FUNCNAME       show a function's definition
--   \sv[+]  VIEWNAME       show a view's definition
--   \z      [PATTERN]      same as \dp

-- Formatting
--   \a                     toggle between unaligned and aligned output mode
--   \C [STRING]            set table title, or unset if none
--   \f [STRING]            show or set field separator for unaligned query output
--   \H                     toggle HTML output mode (currently off)
--   \pset [NAME [VALUE]]   set table output option
--                          (border|columns|csv_fieldsep|expanded|fieldsep|
--                          fieldsep_zero|footer|format|linestyle|null|
--                          numericlocale|pager|pager_min_lines|recordsep|
--                          recordsep_zero|tableattr|title|tuples_only|
--                          unicode_border_linestyle|unicode_column_linestyle|
--                          unicode_header_linestyle)
--   \t [on|off]            show only rows (currently off)
--   \T [STRING]            set HTML <table> tag attributes, or unset if none
--   \x [on|off|auto]       toggle expanded output (currently off)

-- Connection
--   \c[onnect] {[DBNAME|- USER|- HOST|- PORT|-] | conninfo}
--                          connect to new database (currently "dcrjqdnonkc3m0")
--   \conninfo              display information about current connection
--   \encoding [ENCODING]   show or set client encoding
--   \password [USERNAME]   securely change the password for a user

-- Operating System
--   \cd [DIR]              change the current working directory
--   \setenv NAME [VALUE]   set or unset environment variable
--   \timing [on|off]       toggle timing of commands (currently off)
--   \! [COMMAND]           execute command in shell or start interactive shell

-- Variables
--   \prompt [TEXT] NAME    prompt user to set internal variable
--   \set [NAME [VALUE]]    set internal variable, or list all if no parameters
--   \unset NAME            unset (delete) internal variable

-- Large Objects
--   \lo_export LOBOID FILE
--   \lo_import FILE [COMMENT]
--   \lo_list
--   \lo_unlink LOBOID      large object operations
