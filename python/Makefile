VENV_NAME?=venv
PYTHON_VERSION?=3.11

venv: $(VENV_NAME)/bin/activate

$(VENV_NAME)/bin/activate: requirements.txt requirements-dev.txt
	@test -d $(VENV_NAME) || pyenv local $(PYTHON_VERSION) && python -m venv --clear $(VENV_NAME)
	${VENV_NAME}/bin/python -m pip install -r requirements-dev.txt
	@touch $(VENV_NAME)/bin/activate

test: venv
	${VENV_NAME}/bin/python -m unittest discover tests

check-types: venv
	${VENV_NAME}/bin/python -m pyright

build: venv
	cp ../LICENSE LICENSE
	${VENV_NAME}/bin/python -m build
	rm LICENSE

check-lint: venv
	${VENV_NAME}/bin/python -m ruff check

fix-lint: venv
	${VENV_NAME}/bin/python -m ruff check --fix

check-format: venv
	${VENV_NAME}/bin/python -m ruff format --check

fix-format: venv
	${VENV_NAME}/bin/python -m ruff format
