<div id="aggregateMapNav" class="navbar navbar-default" role="navigation" style="margin-bottom:0px;background:#E8E8E8;">
    <div class="container-fluid">
        <div id="controls" class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#my-navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <h3>Aggregate Map<small> by <a href="//twitter.com/banderkat">@banderkat</a></small></h3>
               
        </div>
        <div class="navbar-collapse collapse" id="my-navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <form role="form-addr" class="navbar-form" onsubmit="return searchAddress(this)">
                        <div class="input-group search-container">
                            <input id="enteredAddr" type="text" class="form-control" placeholder="Enter address">
                            <div id="searchAddr" class="input-group-btn"><button class="btn btn-default" type="submit"><span class="glyphicon glyphicon-search"></span></button></div>
                        </div>
                    </form>
                </li>
                <li class="active">
                    <a class="btn button-default" href="javascript:void(0)" onclick="sidebar.toggle()"><span class="glyphicon glyphicon-th-list"></span></a>
                </li>
            </ul>
        </div>
    </div>
</div>