JS_NAME = "noise.js"
JS_MIN_NAME = "noise.min.js"
SRC_FOLDER = "src"
GEN_FOLDER = "gen"
CLOSURE_LOCATION = File.join("bin", "compiler.jar")

OUT_JS_PATH = File.join(GEN_FOLDER, JS_NAME)
OUT_JS_MIN_PATH = File.join(GEN_FOLDER, JS_MIN_NAME)

task :default => [:join_js_files, :closure_compile] do
    puts "Running default build."
end

desc "Combine the various javascript files into one for minimization."
task :join_js_files do
    puts "Deleting old compiled #{JS_NAME} from directory #{GEN_FOLDER}"
    begin
        File.delete(File.join(GEN_FOLDER, JS_NAME))
    rescue
        puts "No file existed, continuing anyway."
    end

    puts "Compiling all the JS files into one monolith."
    open(OUT_JS_PATH, 'a') do |f|
        # recursively go through each file in the source directory
        Dir.glob(File.join(SRC_FOLDER, "**", "*")) do |src_file|
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
task :closure_compile do
    puts "Using Closure to compile JS to a minified version."
    `java -jar #{CLOSURE_LOCATION} --js #{OUT_JS_PATH} --js_output_file #{OUT_JS_MIN_PATH}`
    puts "Successfully compiled to #{OUT_JS_MIN_PATH}"
end
