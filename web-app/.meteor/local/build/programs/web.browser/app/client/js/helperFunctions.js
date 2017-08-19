(function(){mainClass = function(node, bestBlock)
{

    if(!node)
        return;

    if( ! node.active)
        return 'text-gray';

    if(node.peers === 0)
        return 'text-danger';

    return peerClass(node.peers, node.active);
}

peerClass = function(peers, active)
{
    if( ! active)
        return 'text-gray';

    return (peers <= 1 ? 'text-danger' : (peers > 1 && peers < 4 ? 'text-warning' : 'text-success'));
}

})();
