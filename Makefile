

docker: 
	docker build -t gochain/netstats .

run:
	docker run --rm -it -p 3000:3000 -e WS_SECRET gochain/netstats

release: docker
	docker push gochain/netstats


.PHONY: test build docker release run
