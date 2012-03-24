all: rake
	@rake
rake:
	@if ! gem list --local | grep rake > /dev/null; then gem install rake ; fi
clean:
	@rake clean
