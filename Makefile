test:
		@node node_modules/lab/bin/lab -e development -t 90 -m 5000 $(flags)
test-cov:
		@node node_modules/lab/bin/lab -t 90 -e development -v -m 5000 $(flags)
jshint:
		@jshint --exclude node_modules/ $(flags) .
test-code-style:
		@node node_modules/jscs/bin/jscs -c .jscsrc $(flags) ./

.PHONY: test test-cov jshint test-code-style
