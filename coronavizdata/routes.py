import os
from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from coronavizdata import app, db
# import requests

@app.route("/dashboard")
def dashboard():
    return render_template('dashboard.html', title='dashBoard')

@app.route("/")
@app.route("/table")
def table():
    return render_template('table.html', title='Table')

@app.route("/home")
def home():
    return render_template('home.html', title='Home')

@app.route("/about")
def about():
    return render_template('about.html', title='About')

@app.route("/interactive-axis")
def interactive_axis():
    return render_template('interactive-axis.html', title='Interactive Axis')


@app.route("/leaflet/bubble")
def leaflet_bubble():
    return render_template('world-bubble.html', title='Bubble World Map')

@app.route("/leaflet/choropleth")
def leaflet_choropleth():
    return render_template('states.html', title='Choropleth US States')

@app.route("/leaflet/europe")
def leaflet_choropleth_europe():
    return render_template('europe.html', title='Choropleth Europe')

@app.route("/leaflet/asia")
def leaflet_choropleth_asia():
    return render_template('asia.html', title='Choropleth Asia')

@app.route("/test")
def test():
    return render_template('test.html', title='Test')


# squares for dynamic field
@app.route('/fetch/but', methods=['GET', 'POST'])
def jsonify_maptoken():
    ''' RETURNS JSONIFIED DATA FOR SQUARES-HOME SELECT ELEMENT'''
    pass
    mapAccessToken = os.environ.get('MAP_ACCESS_TOKEN')
    
    # print(' --- mapAccessToken ---')
    # print(mapAccessToken)
    
    return jsonify({'doNotTell': mapAccessToken})


@app.route('/api/response', methods=['GET', 'POST'])
def jsonify_comments():
    ''' RETURNS JSONIFIED DATA FOR SQUARES-HOME SELECT ELEMENT'''
    pass
    api_response = [
        {
            "pageNumber": 1,
            "pageSize": 100,
            "totalPages": 2,
            "totalCount": 196,
            "data": [{
                "title": "My Updated Post",
                "comment": "My first updated post! This is exciting!",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "A Second Post",
                "comment": "This is a post from a different user...",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Top 5 Programming Lanaguages",
                "comment": "Te melius apeirian postulant cum, labitur admodum cu eos! Tollit equidem constituto ut has. Et per ponderum sadipscing, eu vero dolores recusabo nec! Eum quas epicuri at, eam albucius phaedrum ad, no eum probo fierent singulis. Dicat corrumpit definiebas id usu, in facete scripserit eam. Vim ei exerci nusquam. Agam detraxit an quo? Quo et partem bonorum sensibus, mutat minimum est ad. In paulo essent signiferumque his, quaestio sadipscing theophrastus ad has. Ancillae appareat qualisque ei has, usu ne assum zril disputationi, sed at gloriatur persequeris.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Sublime Text Tips and Tricks",
                "comment": "Ea vix dico modus voluptatibus, mel iudico suavitate iracundia eu. Tincidunt voluptatibus pro eu? Nulla omittam eligendi his ne, suas putant ut pri. Ullum repudiare at duo, ut cum habeo minim laudem, dicit libris antiopam has ut! Ex movet feugait mea, eu vim impetus nostrud cotidieque. Ei suas similique quo, his simul viris congue ex? Graeci possit in est, ne qui minim delectus invenire. Mei ad error homero maluisset, tacimates assentior per in, vix ut vocent accusata! Mei eu inermis pericula patrioque? Debet denique sea at, ad cibo reformidans theophrastus per, cu inermis maiestatis vim! Ut odio feugiat voluptua est, euismod volutpat qualisque at sit, has ex dicit ornatus inimicus! Eu ferri laoreet vel, dicat corrumpit dissentias nec in. Illum dissentiunt eam ei, praesent voluptatum pri in? Ius in inani petentium, hinc elitr vivendum an vis, in vero dolores electram ius?",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Best Python IDEs",
                "comment": "Elit commentiones nam no, sea ut consul adipiscing. Etiam velit ei usu, sonet clita nonumy eu eum. Usu ea utroque facilisi, cu mel fugit tantas legimus, te vix quem nominavi. Prima deserunt evertitur ne qui, nam reprimique appellantur ne.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Flask vs Django - Which Is Better?",
                "comment": "Ei dicta apeirian deterruisset eam, cu offendit invenire pri, cu possim vivendo vix? Nam nihil evertitur ad, ne vim nonumy legendos iracundia. Vix nulla dolorem intellegebat ea? Te per vide paulo dolor, eum ea erant placerat constituam? Dolores accumsan eum at. Interesset consequuntur id vix. Eam id decore latine, iusto imperdiet ei qui. In ludus consul reformidans eam. Nec in recusabo posidonium, cu tantas volumus mnesarchum pro. Nam ut docendi evertitur, possim menandri persecuti ne sed, cum saepe ornatus delenit ei? In mel debet aliquam. In his etiam legere, doming nominavi consetetur has ad, decore reprimique ea usu. Eam magna graeci suavitate cu, facete delenit cum ne. Ponderum evertitur tincidunt ei mel, ius ei stet euismod docendi.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "You Won't Believe These Clickbait Titles!",
                "comment": "Cu justo honestatis mel, pro ei appareat mediocrem suavitate. No his omnis ridens. Ludus ornatus voluptatum mei ut, an mentitum noluisse forensibus cum. Eam affert pertinax consequuntur ei, nisl zril meliore te vis? Ad animal persius concludaturque vix, eu graece audiam mel. Vitae libris mentitum pri in. Cu rebum veritus sea, ex usu consul dolorum, pro tale maluisset consulatu ut. Quo ad clita persius ancillae. Vel illud blandit at, vel eu hinc graeco, usu doctus praesent ea! Vim rebum deserunt ex. Ius lorem omittam id, est suavitate definitionem ad! Id vim insolens tacimates, pri at decore causae. Ex duo bonorum repudiandae? Vix no vidit facete impedit. An oportere indoctum eam.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "These Beers Will Improve Your Programming",
                "comment": "Sanctus senserit vis id, ut eum iuvaret invidunt constituam? Nonumes facilis mei an, ad elit explicari persequeris pri, dico recusabo quo id? At mea lorem repudiandae. Sed causae sensibus forensibus ea, ne ornatus suscipiantur consectetuer mel, affert nostro nominati cu qui. Te sanctus constituto est, corrumpit pertinacia eos et, mei libris persequeris an. Quo fuisset sensibus in. Ad est assueverit adversarium, viris aperiri numquam est ad. Pro mediocrem iudicabit ei! Cu aperiam diceret sit.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "List of PyCon 2018 Talks",
                "comment": "Has ea verear adolescens, elit justo constituam duo in, vix an copiosae commentiones. Eos persius consequuntur no, esse percipit cum ea, per modus harum praesent at. Et clita delenit luptatum usu? No cum interpretaris concludaturque. Congue pertinax ea mea. Brute iracundia philosophia ei quo, nam at adhuc idque, ex dolor homero mei. No mea affert tacimates pertinacia, in maluisset dissentias consectetuer mei, vel no aliquam splendide. In has nobis vocent adipisci? Pri clita delicata in, iusto viris scripserit vim in? Sit in lorem complectitur. Sanctus eloquentiam eum ut, et sumo apeirian mea? Vim te affert populo voluptaria, utinam consul ad duo.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "How Dogs in the Workplace Boosts Productivity",
                "comment": "Has ea verear adolescens, elit justo constituam duo in, vix an copiosae commentiones. Eos persius consequuntur no, esse percipit cum ea, per modus harum praesent at. Et clita delenit luptatum usu? No cum interpretaris concludaturque. Congue pertinax ea mea. Brute iracundia philosophia ei quo, nam at adhuc idque, ex dolor homero mei. No mea affert tacimates pertinacia, in maluisset dissentias consectetuer mei, vel no aliquam splendide. In has nobis vocent adipisci? Pri clita delicata in, iusto viris scripserit vim in? Sit in lorem complectitur. Sanctus eloquentiam eum ut, et sumo apeirian mea? Vim te affert populo voluptaria, utinam consul ad duo.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "The Best Programming Podcasts",
                "comment": "Vidisse malorum platonem vel no. Persecuti adversarium ut sit, quo et stet velit mundi! Id per homero expetenda. Est brute adipisci et! Lorem aliquip has in, quo debet ceteros sadipscing ne! An sea odio ornatus inermis, an per ipsum persecuti dissentiunt, no mea bonorum pertinacia delicatissimi? Ne sumo diceret mea, percipit repudiare eam no! Pro et lorem accommodare. At eius novum phaedrum mei? Ignota conclusionemque mei no, eam ut munere fierent pertinacia. Ea enim insolens gloriatur duo, quis vituperatoribus pro no! Ei sed bonorum reprehendunt, aliquam nominavi his et. Magna decore referrentur id nec. Cum rebum ludus inimicus no, id cum iusto labores maluisset! Qui no omnis numquam apeirian, et vide interesset cum? Et nec nulla signiferumque. Enim instructior eos ei, solum tollit phaedrum his in? No vix malorum ornatus, cu quo hinc everti iracundia, essent eruditi efficiendi ut nam. Altera saperet usu eu, errem expetenda cu duo. Has dolor splendide et, no mel cibo ancillae voluptatum, mutat antiopam deterruisset ei qui. Dolores scripserit concludaturque est id, ea animal facilisi splendide qui, quo at animal voluptua instructior. Meis voluptatum eu eum.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Tips for Public Speaking",
                "comment": "Ex eam doctus accommodare. Ut oratio vivendo intellegebat qui. Ius ne doming petentium. Pri congue delectus ad, accumsan molestiae disputando te mea. Nam case inani eligendi at, per te esse iudico. Feugiat patrioque mei ad, harum mundi adversarium an per! Ancillae verterem eleifend his at? Nam vidit iusto petentium at, vis nusquam dissentias cu, etiam doctus adversarium eam no. At alterum definiebas efficiantur eos, pro labitur vituperatoribus ne, eu odio legere vim. Ad nec verear appellantur? Ad qui vulputate persequeris.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Best Programmers Throughout History",
                "comment": "Mel nulla legimus senserit id. Vim purto tractatos in, te vix error regione, erant laudem legere an vel. Falli fierent ius ex! In legere iriure est, id vis prima maluisset, purto numquam inimicus ut eos! In duo antiopam salutatus, an vel quodsi virtute definitiones. Est te sumo voluptaria, ius no putant argumentum, alienum ocurreret vim cu? Volumus democritum no vel, virtute commune an est. Vel te propriae lobortis rationibus, no eum odio neglegentur? Duo an sumo ignota latine! Nec mazim aperiam percipitur eu, id his dicit omnium.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "How To Create A YouTube Channel",
                "comment": "Sit et novum omnes. Nec ea quas minim tractatos, usu in aperiam mentitum necessitatibus, ut omnis equidem moderatius quo. Eos ad putent aeterno praesent. Eos omnium similique id, his accommodare philosophia at. Causae lucilius similique in mea, ut regione tritani voluptatibus mel! At possim offendit eum, aeque denique prodesset pro te? At pro quem laudem. Et agam democritum eos? Ea quod probatus usu, no ferri fabulas cotidieque mei? Numquam nusquam quo in, quo et molestiae complectitur. Nihil semper ei qui. Modo omnes forensibus duo ex, te est diceret bonorum labores! Magna ponderum eos ea. Cu vim diceret mnesarchum, graeci periculis in vis. Est no iriure suavitate!",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "How I Record My Videos",
                "comment": "Ad vel possim delicatissimi, delectus detraxit per cu. Ad pri vidit modus altera! In erat complectitur sit, quo no nostro insolens? Aliquam patrioque scribentur quo ad, partem commune eos at. Eius vivendo comprehensam has ne, sea ne eros mazim oratio. Soluta populo te duo, ne pro causae fabulas percipitur, feugiat.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Python and Physics",
                "comment": "Agam mediocritatem sed ex, fabellas recusabo dissentias vix te. No principes consequat inciderint pri, ea mundi affert persecuti mea, ne usu veri regione nostrum! An tibique dissentiet referrentur pro, ridens temporibus eu est! Ius ne omnes affert rationibus, ut detraxit qualisque usu. Accusamus reformidans sea id? Eu aliquip gloriatur mei. Qui ad sint scripserit? Te instructior definitiones mel, sale mutat everti at his. Ea mea quot recusabo philosophia. Et nam quod adipisci, quo atqui appetere recusabo id, detraxit inimicus vim.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Just A Few More Healines Should Do It",
                "comment": "Duo at tibique commune vulputate, ex facilis tacimates disputationi mei. Mel eu inani prompta labores! Audire omnesque offendit ex eos. An ferri accusata his, vel agam habeo maiestatis ex, eam mutat iisque concludaturque ut. Ut tamquam minimum partiendo vim. An nam vidit doming graecis. Singulis abhorreant his in, et altera audiam feugiat mei. Pri eius dolor persequeris id! Nam ea dolorem expetendis, idque everti suscipit qui te, noster repudiare dignissim per ex? No vim iriure tibique comprehensam, per utamur consequat.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Music To Listen To While Coding",
                "comment": "Feugait reprimique eu mel, te eum dico electram. Nam no nemore cotidieque. Vim cu suas atqui dicunt. Id labitur dissentiunt per, ignota maiorum pri no? Clita altera sanctus ex his! At alia electram reprehendunt eam, sea te volumus quaestio. Commodo voluptua senserit ius ne, eu enim disputationi eam? Id pri omnium blandit, nullam denique nec no? Sapientem vituperata sit et, nisl facilisis periculis in est. Elaboraret accommodare id vel? Cibo eripuit ut has, sed cu liber invidunt. Ei pro vide quas dolorum, sea no fugit sanctus neglegentur. Sit feugait disputationi ne. Id diceret periculis nec, sint nonumes in sea, cum.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "5 Tips for Writing Catchy Headlines",
                "comment": "Ea homero possit epicuri est, debitis docendi tacimates cu duo? Ad lorem cetero disputando pri, veniam eruditi tacimates per te.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "The Rise of Data Science",
                "comment": "Per omittam placerat at. Eius aeque ei mei. Usu ex partiendo salutandi. Pro illud placerat molestiae ex, habeo vidisse voluptatum cu vel, efficiendi accommodare eum ea! Ne has case minimum facilisis, pertinax efficiendi eu vel! Et movet semper assueverit his. Mei at liber vitae. Vix et periculis definiebas, vero falli.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            },

                {
                "title": "My Updated Post",
                "comment": "My first updated post! This is exciting!",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "A Second Post",
                "comment": "This is a post from a different user...",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Top 5 Programming Lanaguages",
                "comment": "Te melius apeirian postulant cum, labitur admodum cu eos! Tollit equidem constituto ut has. Et per ponderum sadipscing, eu vero dolores recusabo nec! Eum quas epicuri at, eam albucius phaedrum ad, no eum probo fierent singulis. Dicat corrumpit definiebas id usu, in facete scripserit eam. Vim ei exerci nusquam. Agam detraxit an quo? Quo et partem bonorum sensibus, mutat minimum est ad. In paulo essent signiferumque his, quaestio sadipscing theophrastus ad has. Ancillae appareat qualisque ei has, usu ne assum zril disputationi, sed at gloriatur persequeris.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Sublime Text Tips and Tricks",
                "comment": "Ea vix dico modus voluptatibus, mel iudico suavitate iracundia eu. Tincidunt voluptatibus pro eu? Nulla omittam eligendi his ne, suas putant ut pri. Ullum repudiare at duo, ut cum habeo minim laudem, dicit libris antiopam has ut! Ex movet feugait mea, eu vim impetus nostrud cotidieque. Ei suas similique quo, his simul viris congue ex? Graeci possit in est, ne qui minim delectus invenire. Mei ad error homero maluisset, tacimates assentior per in, vix ut vocent accusata! Mei eu inermis pericula patrioque? Debet denique sea at, ad cibo reformidans theophrastus per, cu inermis maiestatis vim! Ut odio feugiat voluptua est, euismod volutpat qualisque at sit, has ex dicit ornatus inimicus! Eu ferri laoreet vel, dicat corrumpit dissentias nec in. Illum dissentiunt eam ei, praesent voluptatum pri in? Ius in inani petentium, hinc elitr vivendum an vis, in vero dolores electram ius?",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Best Python IDEs",
                "comment": "Elit commentiones nam no, sea ut consul adipiscing. Etiam velit ei usu, sonet clita nonumy eu eum. Usu ea utroque facilisi, cu mel fugit tantas legimus, te vix quem nominavi. Prima deserunt evertitur ne qui, nam reprimique appellantur ne.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Flask vs Django - Which Is Better?",
                "comment": "Ei dicta apeirian deterruisset eam, cu offendit invenire pri, cu possim vivendo vix? Nam nihil evertitur ad, ne vim nonumy legendos iracundia. Vix nulla dolorem intellegebat ea? Te per vide paulo dolor, eum ea erant placerat constituam? Dolores accumsan eum at. Interesset consequuntur id vix. Eam id decore latine, iusto imperdiet ei qui. In ludus consul reformidans eam. Nec in recusabo posidonium, cu tantas volumus mnesarchum pro. Nam ut docendi evertitur, possim menandri persecuti ne sed, cum saepe ornatus delenit ei? In mel debet aliquam. In his etiam legere, doming nominavi consetetur has ad, decore reprimique ea usu. Eam magna graeci suavitate cu, facete delenit cum ne. Ponderum evertitur tincidunt ei mel, ius ei stet euismod docendi.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "You Won't Believe These Clickbait Titles!",
                "comment": "Cu justo honestatis mel, pro ei appareat mediocrem suavitate. No his omnis ridens. Ludus ornatus voluptatum mei ut, an mentitum noluisse forensibus cum. Eam affert pertinax consequuntur ei, nisl zril meliore te vis? Ad animal persius concludaturque vix, eu graece audiam mel. Vitae libris mentitum pri in. Cu rebum veritus sea, ex usu consul dolorum, pro tale maluisset consulatu ut. Quo ad clita persius ancillae. Vel illud blandit at, vel eu hinc graeco, usu doctus praesent ea! Vim rebum deserunt ex. Ius lorem omittam id, est suavitate definitionem ad! Id vim insolens tacimates, pri at decore causae. Ex duo bonorum repudiandae? Vix no vidit facete impedit. An oportere indoctum eam.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "These Beers Will Improve Your Programming",
                "comment": "Sanctus senserit vis id, ut eum iuvaret invidunt constituam? Nonumes facilis mei an, ad elit explicari persequeris pri, dico recusabo quo id? At mea lorem repudiandae. Sed causae sensibus forensibus ea, ne ornatus suscipiantur consectetuer mel, affert nostro nominati cu qui. Te sanctus constituto est, corrumpit pertinacia eos et, mei libris persequeris an. Quo fuisset sensibus in. Ad est assueverit adversarium, viris aperiri numquam est ad. Pro mediocrem iudicabit ei! Cu aperiam diceret sit.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "List of PyCon 2018 Talks",
                "comment": "Has ea verear adolescens, elit justo constituam duo in, vix an copiosae commentiones. Eos persius consequuntur no, esse percipit cum ea, per modus harum praesent at. Et clita delenit luptatum usu? No cum interpretaris concludaturque. Congue pertinax ea mea. Brute iracundia philosophia ei quo, nam at adhuc idque, ex dolor homero mei. No mea affert tacimates pertinacia, in maluisset dissentias consectetuer mei, vel no aliquam splendide. In has nobis vocent adipisci? Pri clita delicata in, iusto viris scripserit vim in? Sit in lorem complectitur. Sanctus eloquentiam eum ut, et sumo apeirian mea? Vim te affert populo voluptaria, utinam consul ad duo.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "How Dogs in the Workplace Boosts Productivity",
                "comment": "Has ea verear adolescens, elit justo constituam duo in, vix an copiosae commentiones. Eos persius consequuntur no, esse percipit cum ea, per modus harum praesent at. Et clita delenit luptatum usu? No cum interpretaris concludaturque. Congue pertinax ea mea. Brute iracundia philosophia ei quo, nam at adhuc idque, ex dolor homero mei. No mea affert tacimates pertinacia, in maluisset dissentias consectetuer mei, vel no aliquam splendide. In has nobis vocent adipisci? Pri clita delicata in, iusto viris scripserit vim in? Sit in lorem complectitur. Sanctus eloquentiam eum ut, et sumo apeirian mea? Vim te affert populo voluptaria, utinam consul ad duo.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "The Best Programming Podcasts",
                "comment": "Vidisse malorum platonem vel no. Persecuti adversarium ut sit, quo et stet velit mundi! Id per homero expetenda. Est brute adipisci et! Lorem aliquip has in, quo debet ceteros sadipscing ne! An sea odio ornatus inermis, an per ipsum persecuti dissentiunt, no mea bonorum pertinacia delicatissimi? Ne sumo diceret mea, percipit repudiare eam no! Pro et lorem accommodare. At eius novum phaedrum mei? Ignota conclusionemque mei no, eam ut munere fierent pertinacia. Ea enim insolens gloriatur duo, quis vituperatoribus pro no! Ei sed bonorum reprehendunt, aliquam nominavi his et. Magna decore referrentur id nec. Cum rebum ludus inimicus no, id cum iusto labores maluisset! Qui no omnis numquam apeirian, et vide interesset cum? Et nec nulla signiferumque. Enim instructior eos ei, solum tollit phaedrum his in? No vix malorum ornatus, cu quo hinc everti iracundia, essent eruditi efficiendi ut nam. Altera saperet usu eu, errem expetenda cu duo. Has dolor splendide et, no mel cibo ancillae voluptatum, mutat antiopam deterruisset ei qui. Dolores scripserit concludaturque est id, ea animal facilisi splendide qui, quo at animal voluptua instructior. Meis voluptatum eu eum.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Tips for Public Speaking",
                "comment": "Ex eam doctus accommodare. Ut oratio vivendo intellegebat qui. Ius ne doming petentium. Pri congue delectus ad, accumsan molestiae disputando te mea. Nam case inani eligendi at, per te esse iudico. Feugiat patrioque mei ad, harum mundi adversarium an per! Ancillae verterem eleifend his at? Nam vidit iusto petentium at, vis nusquam dissentias cu, etiam doctus adversarium eam no. At alterum definiebas efficiantur eos, pro labitur vituperatoribus ne, eu odio legere vim. Ad nec verear appellantur? Ad qui vulputate persequeris.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Best Programmers Throughout History",
                "comment": "Mel nulla legimus senserit id. Vim purto tractatos in, te vix error regione, erant laudem legere an vel. Falli fierent ius ex! In legere iriure est, id vis prima maluisset, purto numquam inimicus ut eos! In duo antiopam salutatus, an vel quodsi virtute definitiones. Est te sumo voluptaria, ius no putant argumentum, alienum ocurreret vim cu? Volumus democritum no vel, virtute commune an est. Vel te propriae lobortis rationibus, no eum odio neglegentur? Duo an sumo ignota latine! Nec mazim aperiam percipitur eu, id his dicit omnium.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "How To Create A YouTube Channel",
                "comment": "Sit et novum omnes. Nec ea quas minim tractatos, usu in aperiam mentitum necessitatibus, ut omnis equidem moderatius quo. Eos ad putent aeterno praesent. Eos omnium similique id, his accommodare philosophia at. Causae lucilius similique in mea, ut regione tritani voluptatibus mel! At possim offendit eum, aeque denique prodesset pro te? At pro quem laudem. Et agam democritum eos? Ea quod probatus usu, no ferri fabulas cotidieque mei? Numquam nusquam quo in, quo et molestiae complectitur. Nihil semper ei qui. Modo omnes forensibus duo ex, te est diceret bonorum labores! Magna ponderum eos ea. Cu vim diceret mnesarchum, graeci periculis in vis. Est no iriure suavitate!",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "How I Record My Videos",
                "comment": "Ad vel possim delicatissimi, delectus detraxit per cu. Ad pri vidit modus altera! In erat complectitur sit, quo no nostro insolens? Aliquam patrioque scribentur quo ad, partem commune eos at. Eius vivendo comprehensam has ne, sea ne eros mazim oratio. Soluta populo te duo, ne pro causae fabulas percipitur, feugiat.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Python and Physics",
                "comment": "Agam mediocritatem sed ex, fabellas recusabo dissentias vix te. No principes consequat inciderint pri, ea mundi affert persecuti mea, ne usu veri regione nostrum! An tibique dissentiet referrentur pro, ridens temporibus eu est! Ius ne omnes affert rationibus, ut detraxit qualisque usu. Accusamus reformidans sea id? Eu aliquip gloriatur mei. Qui ad sint scripserit? Te instructior definitiones mel, sale mutat everti at his. Ea mea quot recusabo philosophia. Et nam quod adipisci, quo atqui appetere recusabo id, detraxit inimicus vim.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Just A Few More Healines Should Do It",
                "comment": "Duo at tibique commune vulputate, ex facilis tacimates disputationi mei. Mel eu inani prompta labores! Audire omnesque offendit ex eos. An ferri accusata his, vel agam habeo maiestatis ex, eam mutat iisque concludaturque ut. Ut tamquam minimum partiendo vim. An nam vidit doming graecis. Singulis abhorreant his in, et altera audiam feugiat mei. Pri eius dolor persequeris id! Nam ea dolorem expetendis, idque everti suscipit qui te, noster repudiare dignissim per ex? No vim iriure tibique comprehensam, per utamur consequat.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Music To Listen To While Coding",
                "comment": "Feugait reprimique eu mel, te eum dico electram. Nam no nemore cotidieque. Vim cu suas atqui dicunt. Id labitur dissentiunt per, ignota maiorum pri no? Clita altera sanctus ex his! At alia electram reprehendunt eam, sea te volumus quaestio. Commodo voluptua senserit ius ne, eu enim disputationi eam? Id pri omnium blandit, nullam denique nec no? Sapientem vituperata sit et, nisl facilisis periculis in est. Elaboraret accommodare id vel? Cibo eripuit ut has, sed cu liber invidunt. Ei pro vide quas dolorum, sea no fugit sanctus neglegentur. Sit feugait disputationi ne. Id diceret periculis nec, sint nonumes in sea, cum.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "5 Tips for Writing Catchy Headlines",
                "comment": "Ea homero possit epicuri est, debitis docendi tacimates cu duo? Ad lorem cetero disputando pri, veniam eruditi tacimates per te.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "The Rise of Data Science",
                "comment": "Per omittam placerat at. Eius aeque ei mei. Usu ex partiendo salutandi. Pro illud placerat molestiae ex, habeo vidisse voluptatum cu vel, efficiendi accommodare eum ea! Ne has case minimum facilisis, pertinax efficiendi eu vel! Et movet semper assueverit his. Mei at liber vitae. Vix et periculis definiebas, vero falli.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            },

                {
                "title": "My Updated Post",
                "comment": "My first updated post! This is exciting!",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "A Second Post",
                "comment": "This is a post from a different user...",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Top 5 Programming Lanaguages",
                "comment": "Te melius apeirian postulant cum, labitur admodum cu eos! Tollit equidem constituto ut has. Et per ponderum sadipscing, eu vero dolores recusabo nec! Eum quas epicuri at, eam albucius phaedrum ad, no eum probo fierent singulis. Dicat corrumpit definiebas id usu, in facete scripserit eam. Vim ei exerci nusquam. Agam detraxit an quo? Quo et partem bonorum sensibus, mutat minimum est ad. In paulo essent signiferumque his, quaestio sadipscing theophrastus ad has. Ancillae appareat qualisque ei has, usu ne assum zril disputationi, sed at gloriatur persequeris.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Sublime Text Tips and Tricks",
                "comment": "Ea vix dico modus voluptatibus, mel iudico suavitate iracundia eu. Tincidunt voluptatibus pro eu? Nulla omittam eligendi his ne, suas putant ut pri. Ullum repudiare at duo, ut cum habeo minim laudem, dicit libris antiopam has ut! Ex movet feugait mea, eu vim impetus nostrud cotidieque. Ei suas similique quo, his simul viris congue ex? Graeci possit in est, ne qui minim delectus invenire. Mei ad error homero maluisset, tacimates assentior per in, vix ut vocent accusata! Mei eu inermis pericula patrioque? Debet denique sea at, ad cibo reformidans theophrastus per, cu inermis maiestatis vim! Ut odio feugiat voluptua est, euismod volutpat qualisque at sit, has ex dicit ornatus inimicus! Eu ferri laoreet vel, dicat corrumpit dissentias nec in. Illum dissentiunt eam ei, praesent voluptatum pri in? Ius in inani petentium, hinc elitr vivendum an vis, in vero dolores electram ius?",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Best Python IDEs",
                "comment": "Elit commentiones nam no, sea ut consul adipiscing. Etiam velit ei usu, sonet clita nonumy eu eum. Usu ea utroque facilisi, cu mel fugit tantas legimus, te vix quem nominavi. Prima deserunt evertitur ne qui, nam reprimique appellantur ne.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "Flask vs Django - Which Is Better?",
                "comment": "Ei dicta apeirian deterruisset eam, cu offendit invenire pri, cu possim vivendo vix? Nam nihil evertitur ad, ne vim nonumy legendos iracundia. Vix nulla dolorem intellegebat ea? Te per vide paulo dolor, eum ea erant placerat constituam? Dolores accumsan eum at. Interesset consequuntur id vix. Eam id decore latine, iusto imperdiet ei qui. In ludus consul reformidans eam. Nec in recusabo posidonium, cu tantas volumus mnesarchum pro. Nam ut docendi evertitur, possim menandri persecuti ne sed, cum saepe ornatus delenit ei? In mel debet aliquam. In his etiam legere, doming nominavi consetetur has ad, decore reprimique ea usu. Eam magna graeci suavitate cu, facete delenit cum ne. Ponderum evertitur tincidunt ei mel, ius ei stet euismod docendi.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "You Won't Believe These Clickbait Titles!",
                "comment": "Cu justo honestatis mel, pro ei appareat mediocrem suavitate. No his omnis ridens. Ludus ornatus voluptatum mei ut, an mentitum noluisse forensibus cum. Eam affert pertinax consequuntur ei, nisl zril meliore te vis? Ad animal persius concludaturque vix, eu graece audiam mel. Vitae libris mentitum pri in. Cu rebum veritus sea, ex usu consul dolorum, pro tale maluisset consulatu ut. Quo ad clita persius ancillae. Vel illud blandit at, vel eu hinc graeco, usu doctus praesent ea! Vim rebum deserunt ex. Ius lorem omittam id, est suavitate definitionem ad! Id vim insolens tacimates, pri at decore causae. Ex duo bonorum repudiandae? Vix no vidit facete impedit. An oportere indoctum eam.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "These Beers Will Improve Your Programming",
                "comment": "Sanctus senserit vis id, ut eum iuvaret invidunt constituam? Nonumes facilis mei an, ad elit explicari persequeris pri, dico recusabo quo id? At mea lorem repudiandae. Sed causae sensibus forensibus ea, ne ornatus suscipiantur consectetuer mel, affert nostro nominati cu qui. Te sanctus constituto est, corrumpit pertinacia eos et, mei libris persequeris an. Quo fuisset sensibus in. Ad est assueverit adversarium, viris aperiri numquam est ad. Pro mediocrem iudicabit ei! Cu aperiam diceret sit.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "List of PyCon 2018 Talks",
                "comment": "Has ea verear adolescens, elit justo constituam duo in, vix an copiosae commentiones. Eos persius consequuntur no, esse percipit cum ea, per modus harum praesent at. Et clita delenit luptatum usu? No cum interpretaris concludaturque. Congue pertinax ea mea. Brute iracundia philosophia ei quo, nam at adhuc idque, ex dolor homero mei. No mea affert tacimates pertinacia, in maluisset dissentias consectetuer mei, vel no aliquam splendide. In has nobis vocent adipisci? Pri clita delicata in, iusto viris scripserit vim in? Sit in lorem complectitur. Sanctus eloquentiam eum ut, et sumo apeirian mea? Vim te affert populo voluptaria, utinam consul ad duo.",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }, {
                "title": "A Second Post",
                "comment": "This is a post from a different user...",
                "id": 7122085899200388,
                "name": "1.  Template - New Client - Cloud",
                "accessLevel": "ADMIN",
                "permalink": "https://app.smartsheet.com/sheets/3rcmRJ7FX4j5W5H4JHp6xm9cpqPpPmc93p6qfH81",
                "createdAt": "2018-08-27T16:15:40Z",
                "modifiedAt": "2020-04-24T17:26:39Z"
            }
            ]
        }
    ]
    # print(api_response)
    print(' --- api response ---')
    
    return jsonify(api_response)


@app.route('/comments/table', methods=['GET', 'POST'])
def comment_reporter():
    pass
    myURL = "http://127.0.0.1:5000/api/response"
    print(myURL)
    
    # print(requests.get(myURL))
    
    # response = requests.get(myURL).json()

    print(' < --- response -> data -> comments  --->')
    # print(response[0]['data'])
    # data = response[0]['data']
    # comments_fetched = [dict['comment'] for dict in data]
    # print(comments_fetched[0])
    
    
    return render_template('comment.html', title='responseTest')

