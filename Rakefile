require 'rake/clean'

JS_NAME = "noise.js"
JS_MIN_NAME = "noise.min.js"
CLEAN.include('./'+JS_NAME);
CLEAN.include('./'+JS_MIN_NAME);

SRC_FILES = [
    "external/audiolib.js",
    "src/binaural.js",
    "src/noise.js"
]
GEN_FOLDER = "."
CLOSURE_LOCATION = File.join("bin", "compiler.jar")

OUT_JS_PATH = File.join(GEN_FOLDER, JS_NAME)
OUT_JS_MIN_PATH = File.join(GEN_FOLDER, JS_MIN_NAME)

task :default => [:build, :minify] do
    puts "Running default build."
end

desc "Combine the various javascript files into one for minimization."
task :build => :clean do
    begin
        File.delete(File.join(GEN_FOLDER, JS_NAME))
    rescue
        puts "No file existed, continuing anyway."
    end

    puts "Compiling all the JS files into one monolith."
    open(OUT_JS_PATH, 'a') do |f|
        # recursively go through each file in the source directory
        SRC_FILES.each do |src_file|
            puts " - Appending #{src_file}"
            # copy all the lines of that file, appending it to the compiled target
            open(src_file, 'r') do |src_f|
                while (line = src_f.gets)
                    f.puts line
                end
            end
            #`cat #{filename} >> #{File.join(GEN_FOLDER, JS_NAME)}`
        end
    end
end

desc "Minimize our concatenated javascript files into one tiny file."
task :minify do
    puts "Minifying with Closure compiler."
    `java -jar #{CLOSURE_LOCATION} --language_in=ECMASCRIPT5 --js #{OUT_JS_PATH} --js_output_file #{OUT_JS_MIN_PATH}`
    puts "Successfully compiled to #{OUT_JS_MIN_PATH}"
end
