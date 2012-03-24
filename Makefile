all: rake
	rake
rake:
	(! gem list --local | grep rake && gem install rake) ; true
clean:
	rake clean